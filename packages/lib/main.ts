import { DoublesMemberGenerator, GameMembers, History, MemberId, PlayCountPerMember } from "./types";
import { array } from "./util";

type ConstructorProps = {
    courtCount: number;
    members: MemberId[];
    histories?: History[];
    gameCounts?: PlayCountPerMember;
};

// 1 コートあたりの収容人数（バドミントンのダブルスなので 4）
export const COURT_CAPACITY = 4;

// コート数の上限 (これ以上必要になることはないはず)
export const COURT_COUNT_LIMIT = 4;

// メンバー数の上限（これ以上必要になることはないはず）
export const MEMBER_COUNT_LIMIT = COURT_CAPACITY * COURT_COUNT_LIMIT * 2;

// ソート用のプロパティを持ったオブジェクトの配列
type SortableMembers = { members: GameMembers; dev: number; dist: number; range: number };

function sortableMembersComparator(a: SortableMembers, b: SortableMembers) {
    if (a.range === b.range) {
        if (a.dist === b.dist) {
            return a.dev - b.dev;
        }
        return b.dist - a.dist;
    }
    return a.range - b.range;
}

export class BadmintonDoublesMemberGenerator implements DoublesMemberGenerator {
    readonly courtCount: number;
    readonly members: MemberId[];
    readonly histories: History[];
    readonly historyKeys: Set<string>;
    readonly gameCounts: PlayCountPerMember;

    /** コートとメンバーの全組み合わせ数 */
    readonly combinationCount: number;

    constructor({ courtCount, members, histories = [], gameCounts = {} }: ConstructorProps) {
        if (courtCount < 1) {
            throw new Error("The number of courts must be at least 1");
        }
        if (courtCount > COURT_COUNT_LIMIT) {
            throw new Error("The number of courts exceeds the limit");
        }
        if (members.length > MEMBER_COUNT_LIMIT) {
            throw new Error("The number of members exceeds the limit");
        }
        if (members.length < courtCount * COURT_CAPACITY) {
            throw new Error("The number of participants is less than the number of people who can play in a court");
        }

        this.courtCount = courtCount;
        this.histories = histories;
        this.historyKeys = new Set(this.histories.map(toHistoryKey));

        this.members = members;
        this.gameCounts = gameCounts;

        this.combinationCount = getCombinationCount(courtCount, members.length);
    }

    get memberCount() {
        return this.members.length;
    }

    get courtCapacity() {
        return this.courtCount * COURT_CAPACITY;
    }

    join(): BadmintonDoublesMemberGenerator {
        const newId = Math.max(...this.members) + 1;
        return new BadmintonDoublesMemberGenerator({
            courtCount: this.courtCount,
            histories: [...this.histories],
            gameCounts: { ...this.gameCounts, [newId]: 0 },
            members: [...this.members, newId],
        });
    }

    leave(...ids: number[]): BadmintonDoublesMemberGenerator {
        return new BadmintonDoublesMemberGenerator({
            courtCount: this.courtCount,
            // 抜けた人が含まれる履歴に削除マークをつける
            histories: markLeavedMembersHistory(this.histories, ids),
            gameCounts: { ...this.gameCounts },
            members: this.members.filter((id) => !ids.includes(id)),
        });
    }

    next(): GameMembers {
        return this.#generateRandomMembers();
    }

    retry(): GameMembers {
        if (this.histories.length === 0) {
            throw new Error("履歴がないためリトライできません");
        }

        const latestHistory = this.#removeLatestHistory();
        const members = this.#generateRandomMembers();

        // 同じだったらリトライの意味がないので再帰
        if (toHistoryKey(latestHistory) === toHistoryKey({ members })) {
            return this.retry();
        }

        return members;
    }

    // なるべく過去の履歴とかぶらないように組み合わせを払い出す関数
    #generateRandomMembers(): GameMembers {
        // 履歴がない場合はランダムに選出する
        if (this.histories.length === 0) {
            return this.#addHistory(this.#getRandomMembers());
        }

        // 履歴数が組み合わせ数以上の場合は、これ以上ランダムに選出しても意味がないため
        // ランダム選出を終了し、履歴を最初から繰り返す
        if (this.histories.length >= this.combinationCount) {
            console.log(
                `履歴数(${this.histories.length})が組み合わせ数(${this.combinationCount})に達したため最も古い履歴を選出`,
            );
            const oldest = this.histories.shift();
            this.histories.push(oldest);
            return oldest.members;
        }

        const generatedMembers: SortableMembers[] = [];

        // メンバー数の 10 倍か、最大組み合わせ数 - 履歴数のどちらか小さい方の数だけ組み合わせを払い出す (最大 320)
        const generateSize = Math.min(this.memberCount * 10, this.combinationCount - this.histories.length);

        while (generatedMembers.length < generateSize) {
            // とりあえず適当に払い出す
            const members = this.#getRandomMembers();

            // 履歴にすでに同じ組み合わせがあったらやり直し
            if (this.historyKeys.has(toHistoryKey({ members }))) {
                console.log(`${toHistoryKey({ members })} は既出のためやり直し`);
                continue;
            }

            // gameCounts のコピーを作成し、参加メンバーの参加回数を 1 ずつ増やす
            // あくまで標準偏差などの計算用で、インスタンスの gameCounts は直接増やさない
            const gameCounts = incrementGameCounts({ ...this.gameCounts }, members);

            // すでにいない人のカウントは参照しないように除外
            const gameCountsWithoutLeavedMember = Object.entries(gameCounts)
                .filter(([id, count]) => this.members.includes(Number(id)))
                .map(([_, count]) => count);

            // 参加メンバーの参加回数の標準偏差が 1 以上だったらやり直し
            const dev = array.standardDeviation(gameCountsWithoutLeavedMember);
            if (dev >= 1) continue;

            // 最大値と最小値の差を求めておく（あとでソートに使う）
            const range = array.range(gameCountsWithoutLeavedMember);

            // 編集距離の平均を求めておく（あとでソートに使う）
            const dist = this.#averageEditDistance(members);

            generatedMembers.push({ members, dev, dist, range });
        }

        // 最大最小の差が最小で、編集距離が最大のものを選出する (編集距離が同じ場合は標準偏差が小さいものを選出する)
        generatedMembers.sort(sortableMembersComparator);

        return this.#addHistory(generatedMembers[0].members);
    }

    #averageEditDistance(members: GameMembers): number {
        return array.average(
            this.histories
                .filter((history) => !history.deleted)
                .map((history) => array.editDistance2D(history.members, members)),
        );
    }

    #addHistory(members: GameMembers) {
        this.histories.push({ members });
        this.historyKeys.add(toHistoryKey({ members }));
        incrementGameCounts(this.gameCounts, members);
        return members;
    }

    #removeLatestHistory() {
        const latestHistory = this.histories.pop();
        decrementGameCounts(this.gameCounts, latestHistory.members);
        this.historyKeys.delete(toHistoryKey(latestHistory));
        return latestHistory;
    }

    #getRandomMembers(): GameMembers {
        const randomMembers = array.shuffle(this.members).slice(0, this.courtCapacity);
        const membersPerCourt = array.chunks(randomMembers, COURT_CAPACITY);
        return array.sortInnerItems(membersPerCourt) as GameMembers;
    }
}

function markLeavedMembersHistory(histories: History[], ids: number[]): History[] {
    return histories.map((history) =>
        history.members.flat().some((id) => ids.includes(id)) ? { ...history, deleted: true } : history,
    );
}

function incrementGameCount(gameCounts: PlayCountPerMember, id: MemberId): void {
    gameCounts[id] = (gameCounts[id] || 0) + 1;
}

function incrementGameCounts(gameCounts: PlayCountPerMember, members: GameMembers): PlayCountPerMember {
    members.flat().forEach((id) => incrementGameCount(gameCounts, id));
    return gameCounts;
}

function decrementGameCount(gameCounts: PlayCountPerMember, id: MemberId): void {
    gameCounts[id] = Math.max(0, (gameCounts[id] || 0) - 1);
}

function decrementGameCounts(gameCounts: PlayCountPerMember, members: GameMembers): PlayCountPerMember {
    members.flat().forEach((id) => decrementGameCount(gameCounts, id));
    return gameCounts;
}

function toHistoryKey(history: History): string {
    return JSON.stringify(history.members);
}

// コートとメンバーの全組み合わせ数を返す関数
function getCombinationCount(courtCount: number, memberCount: number): number {
    // 二項係数を返す関数
    function binomialCoefficient(n: number, k: number): number {
        let result = 1;
        for (let i = 1; i <= k; i++) {
            result *= n - k + i;
            result /= i;
        }
        return result;
    }

    let result = 1;
    for (let i = 0; i < courtCount; i++) {
        result *=
            (memberCount - i * COURT_CAPACITY) *
            (memberCount - i * COURT_CAPACITY - 1) *
            (memberCount - i * COURT_CAPACITY - 2) *
            (memberCount - i * COURT_CAPACITY - 3);
        result /= 24;
    }

    // 1000 超えたらあんまり意味ないので早々に return
    if (result >= 1000) {
        return result;
    }

    result *= binomialCoefficient(memberCount - COURT_CAPACITY * courtCount, memberCount % COURT_CAPACITY);
    return result;
}
