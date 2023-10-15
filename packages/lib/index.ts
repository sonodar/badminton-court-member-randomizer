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
const COURT_CAPACITY = 4;

class BadmintonCourtMemberRandomizer implements IBadmintonCourtMemberRandomizer {
    readonly courtCount: number;
    readonly members: MemberId[];
    readonly histories: GameMembers[];
    readonly gameCounts: GameCountPerMember;

    currentThreshold: number;
    currentMaxRetry: number;

    constructor({ courtCount, members, histories = [], gameCounts = {} }: ShufflerConstructorProps) {
        if (members.length < courtCount * COURT_CAPACITY) {
            throw new Error("参加人数がコートに入れる人数を下回っています");
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
        members.flat().forEach((id) => (this.gameCounts[id] = (this.gameCounts[id] || 0) + 1));
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
