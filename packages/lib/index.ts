import { calculateEditDistance, pickMaxValueIndex, shuffle, sortInner, splitChunks } from "./array-util";

type MemberId = number;
type CourtMembers = [MemberId, MemberId, MemberId, MemberId];
type GameMembers = CourtMembers[];
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
    join(count: number): IBadmintonCourtMemberRandomizer;
    leave(count: number): IBadmintonCourtMemberRandomizer;
}

type Environment = {
    courtCount: number;
    memberCount: number;
};

type ShufflerConstructorProps = Environment & {
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

    #currentThreashold: number;
    #currentMaxRetry: number;

    constructor({ courtCount, memberCount, histories = [], gameCounts = {} }: ShufflerConstructorProps) {
        if (memberCount < courtCount * COURT_CAPACITY) {
            throw new Error("参加人数がコートに入れる人数を下回っています");
        }

        this.courtCount = courtCount;
        this.histories = [...histories];

        this.members = [];
        this.gameCounts = {};

        for (let i = 0; i < memberCount; i++) {
            const memberId: MemberId = i + 1;
            this.members.push(memberId);
            this.gameCounts[memberId] = gameCounts[memberId] || 0;
        }

        this.#currentThreashold = this.courtCapacity; // 初期値の根拠はない
        this.#currentMaxRetry = this.memberCount; // 初期値の根拠はない
    }

    get memberCount() {
        return this.members.length;
    }

    get courtCapacity() {
        return this.courtCount * COURT_CAPACITY;
    }

    join(count: number): BadmintonCourtMemberRandomizer {
        return new BadmintonCourtMemberRandomizer({
            courtCount: this.courtCount,
            histories: this.histories,
            gameCounts: this.gameCounts,
            memberCount: this.memberCount + count,
        });
    }

    leave(count: number): BadmintonCourtMemberRandomizer {
        return new BadmintonCourtMemberRandomizer({
            courtCount: this.courtCount,
            histories: this.histories,
            gameCounts: this.gameCounts,
            memberCount: this.memberCount - count,
        });
    }

    next(): GameMembers {
        const members = this.#generateRandomMembers();
        this.histories.push(members);
        members.flat().forEach((id) => this.gameCounts[id]++);
        return members;
    }

    retry(): GameMembers {
        const previous = this.histories.pop();
        if (previous) {
            previous.flat().forEach((id) => {
                this.gameCounts[id] = Math.max(0, this.gameCounts[id] - 1);
            });
        }
        return this.next();
    }

    // 履歴との最小編集距離が指定した閾値以下になるまでランダムで払い出す
    #generateRandomMembers(): GameMembers {
        const generates: GameMembers[] = [];
        const minHistory: number[] = [];

        for (let i = 0; i < this.#currentMaxRetry; i++) {
            const members = this.#getRandomMembers(); // 適当に払い出す
            const minEditDistance = this.#getMinimumEditDistance(members);
            if (minEditDistance <= this.#currentThreashold) {
                return members;
            }
            generates.push(members);
            minHistory.push(minEditDistance);
        }

        this.#currentMaxRetry++;
        this.#currentThreashold = Math.max(1, this.#currentThreashold - 1);

        const maxIndex = pickMaxValueIndex(minHistory);
        return generates[maxIndex];
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
    return new BadmintonCourtMemberRandomizer({ courtCount, memberCount });
}
