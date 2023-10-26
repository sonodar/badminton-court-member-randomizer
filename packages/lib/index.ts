import { array } from "./util";

type MemberId = number;
type CourtMembers = [MemberId, MemberId, MemberId, MemberId];
export type GameMembers = CourtMembers[];
type PlayCountPerMember = Record<MemberId, number>;

interface DoublesMemberGenerator {
    readonly courtCount: number;
    readonly courtCapacity: number;
    readonly members: MemberId[];
    readonly histories: GameMembers[];
    readonly gameCounts: PlayCountPerMember;
    next(): GameMembers;
    retry(): GameMembers;
    join(): DoublesMemberGenerator;
    leave(...ids: number[]): DoublesMemberGenerator;
}

export type Environment = {
    courtCount: number;
    memberCount: number;
};

type ShufflerConstructorProps = {
    courtCount: number;
    members: MemberId[];
    histories?: GameMembers[];
    gameCounts?: PlayCountPerMember;
};

// 1 コートあたりの収容人数（バドミントンのダブルスなので 4）
export const COURT_CAPACITY = 4;

// コート数の上限 (これ以上必要になることはないはず)
export const COURT_COUNT_LIMIT = 4;

// メンバー数の上限（これ以上必要になることはないはず）
export const MEMBER_COUNT_LIMIT = COURT_CAPACITY * COURT_COUNT_LIMIT * 2;

class BadmintonCourtMemberRandomizer implements DoublesMemberGenerator {
    readonly courtCount: number;
    readonly members: MemberId[];
    readonly histories: GameMembers[];
    readonly historyKeys: Set<string>;
    readonly gameCounts: PlayCountPerMember;

    /** コートとメンバーの全組み合わせ数 */
    readonly combinationCount: number;

    constructor({ courtCount, members, histories = [], gameCounts = {} }: ShufflerConstructorProps) {
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

    join(): BadmintonCourtMemberRandomizer {
        const newId = Math.max(...this.members) + 1;
        return new BadmintonCourtMemberRandomizer({
            courtCount: this.courtCount,
            histories: [...this.histories],
            gameCounts: { ...this.gameCounts, [newId]: 0 },
            members: [...this.members, newId],
        });
    }

    leave(...ids: number[]): BadmintonCourtMemberRandomizer {
        const gameCounts = { ...this.gameCounts };
        ids.forEach((id) => {
            delete gameCounts[id];
        });
        return new BadmintonCourtMemberRandomizer({
            courtCount: this.courtCount,
            // 抜けた人が含まれる履歴もすべて削除する
            histories: dropLeavedMembersHistory(this.histories, ids),
            gameCounts,
            members: this.members.filter((id) => !ids.includes(id)),
        });
    }

    next(): GameMembers {
        return this.#generateRandomMembers();
    }

    retry(): GameMembers {
        const previous = this.histories.pop();
        if (previous) {
            previous.flat().forEach((id) => {
                this.gameCounts[id] = Math.max(0, (this.gameCounts[id] || 0) - 1);
            });
        }
        return this.#generateRandomMembers(false);
    }

    // なるべく過去の履歴とかぶらないように組み合わせを払い出す関数
    #generateRandomMembers(ease = true): GameMembers {
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
            return oldest;
        }

        // ソート用のプロパティを持ったオブジェクトの配列
        const generatedMembers: { members: GameMembers; dev: number; dist: number; range: number }[] = [];

        // メンバー数の 10 倍か、最大組み合わせ数 - 履歴数のどちらか小さい方の数だけ組み合わせを払い出す (最大 320)
        const generateSize = Math.min(this.memberCount * 10, this.combinationCount - this.histories.length);

        while (generatedMembers.length < generateSize) {
            // とりあえず適当に払い出す
            const members = this.#getRandomMembers();

            // 履歴にすでに同じ組み合わせがあったらやり直し
            if (this.historyKeys.has(toHistoryKey(members))) {
                console.log(`${toHistoryKey(members)} は既出のためやり直し`);
                continue;
            }

            // gameCounts のコピーを作成し、参加メンバーの参加回数を 1 ずつ増やす
            // あくまで標準偏差などの計算用で、インスタンスの gameCounts は直接増やさない
            const gameCounts = incrementGameCounts({ ...this.gameCounts }, members);

            // 参加メンバーの参加回数の標準偏差が 1 以上だったらやり直し
            const dev = array.standardDeviation(Object.values(gameCounts));
            if (dev >= 1) continue;

            // 最大値と最小値の差を求めておく（あとでソートに使う）
            const range = array.range(Object.values(gameCounts));

            // 編集距離の平均を求めておく（あとでソートに使う）
            const dist = this.#averageEditDistance(members);

            generatedMembers.push({ members, dev, dist, range });
        }

        // 最大最小の差が最小で、編集距離が最大のものを選出する (編集距離が同じ場合は標準偏差が小さいものを選出する)
        generatedMembers.sort((a, b) => {
            if (a.range === b.range) {
                if (a.dist === b.dist) {
                    return a.dev - b.dev;
                }
                return b.dist - a.dist;
            }
            return a.range - b.range;
        });

        return this.#addHistory(generatedMembers[0].members);
    }

    #averageEditDistance(members: GameMembers): number {
        return array.average(this.histories.map((history) => array.editDistance2D(history, members)));
    }

    #addHistory(members: GameMembers) {
        this.histories.push(members);
        incrementGameCounts(this.gameCounts, members);
        return members;
    }

    #getRandomMembers(): GameMembers {
        const randomMembers = array.shuffle(this.members).slice(0, this.courtCapacity);
        const membersPerCourt = array.chunks(randomMembers, COURT_CAPACITY);
        return array.sortInnerItems(membersPerCourt) as GameMembers;
    }
}

export function create({ courtCount, memberCount }: Environment): DoublesMemberGenerator {
    const members = Array.from({ length: memberCount }, (_, i) => i + 1);
    return new BadmintonCourtMemberRandomizer({ courtCount, members });
}

function dropLeavedMembersHistory(histories: GameMembers[], ids: number[]): GameMembers[] {
    return histories.filter((history) => !history.flat().some((id) => ids.includes(id)));
}

function incrementGameCount(gameCounts: PlayCountPerMember, id: MemberId): void {
    gameCounts[id] = (gameCounts[id] || 0) + 1;
}

function incrementGameCounts(gameCounts: PlayCountPerMember, members: GameMembers): PlayCountPerMember {
    members.flat().forEach((id) => incrementGameCount(gameCounts, id));
    return gameCounts;
}

function toHistoryKey(history: GameMembers): string {
    return JSON.stringify(history);
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
    result *= binomialCoefficient(memberCount - COURT_CAPACITY * courtCount, memberCount % COURT_CAPACITY);
    return result;
}
