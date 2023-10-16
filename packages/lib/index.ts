import { calculateEditDistance, pickMaxValueIndex, shuffle, sortInner, splitChunks } from "./array-util";

type MemberId = number;
type CourtMembers = [MemberId, MemberId, MemberId, MemberId];
export type GameMembers = CourtMembers[];
type GameCountPerMember = Record<MemberId, number>;

interface IBadmintonCourtMemberRandomizer {
    readonly courtCount: number;
    readonly courtCapacity: number;
    readonly members: MemberId[];
    readonly memberCount: number;
    readonly histories: GameMembers[];
    readonly gameCounts: GameCountPerMember;
    next(): GameMembers;
    retry(): GameMembers;
    join(): IBadmintonCourtMemberRandomizer;
    leave(...ids: number[]): IBadmintonCourtMemberRandomizer;
}

export type Environment = {
    courtCount: number;
    memberCount: number;
};

type ShufflerConstructorProps = {
    courtCount: number;
    members: MemberId[];
    histories?: GameMembers[];
    gameCounts?: GameCountPerMember;
};

// 1 コートあたりの収容人数（バドミントンのダブルスなので 4）
export const COURT_CAPACITY = 4;

// コート数の上限 (これ以上必要になることはないはず)
export const COURT_COUNT_LIMIT = 4;

// メンバー数の上限（これ以上必要になることはないはず）
export const MEMBER_COUNT_LIMIT = COURT_CAPACITY * COURT_COUNT_LIMIT * 2;

class BadmintonCourtMemberRandomizer implements IBadmintonCourtMemberRandomizer {
    readonly courtCount: number;
    readonly members: MemberId[];
    readonly histories: GameMembers[];
    readonly gameCounts: GameCountPerMember;

    currentThreshold: number;
    currentMaxRetry: number;

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

        this.members = members;
        this.gameCounts = gameCounts;

        this.currentThreshold = this.courtCapacity; // 初期値の根拠はない
        this.currentMaxRetry = this.memberCount; // 初期値の根拠はない
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
        return new BadmintonCourtMemberRandomizer({
            courtCount: this.courtCount,
            histories: [...this.histories],
            gameCounts: { ...this.gameCounts },
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

    // 履歴との最小編集距離が指定した閾値以下になるまでランダムで払い出す
    // TODO: アルゴリズムを変更する
    // すべての組み合わせを導出し、その中からランダムで選出する
    // かつ、すでに履歴にある組み合わせは除外する
    // また、各メンバーのゲーム回数が均等になるようにする（ゲーム回数の偏りがあると、履歴との編集距離が大きくなる）
    #generateRandomMembers(ease = true): GameMembers {
        const generates: GameMembers[] = [];
        const minHistory: number[] = [];

        for (let i = 0; i <= this.currentMaxRetry; i++) {
            const members = this.#getRandomMembers(); // 適当に払い出す
            const minEditDistance = this.#getMinimumEditDistance(members);
            if (minEditDistance >= this.currentThreshold) {
                return this.#addHistory(members);
            }
            generates.push(members);
            minHistory.push(minEditDistance);
        }

        if (ease) {
            this.currentMaxRetry++;
            this.currentThreshold = Math.max(1, this.currentThreshold - 1);
        }

        const maxIndex = pickMaxValueIndex(minHistory);
        return this.#addHistory(generates[maxIndex]);
    }

    #addHistory(members: GameMembers) {
        this.histories.push(members);
        members.flat().forEach((id) => {
            this.gameCounts[id] = (this.gameCounts[id] || 0) + 1;
        });
        return members;
    }

    #getMinimumEditDistance(members: GameMembers): number {
        return this.histories.reduce(
            (min, history) => Math.min(min, calculateEditDistance(history, members)),
            members.length,
        );
    }

    #getRandomMembers(): GameMembers {
        const randomMembers = shuffle(this.members).slice(0, this.courtCapacity);
        const membersPerCourt = splitChunks(randomMembers, COURT_CAPACITY);
        return sortInner(membersPerCourt) as GameMembers;
    }
}

export function create({ courtCount, memberCount }: Environment): IBadmintonCourtMemberRandomizer {
    const members = Array.from({ length: memberCount }, (_, i) => i + 1);
    return new BadmintonCourtMemberRandomizer({ courtCount, members });
}
