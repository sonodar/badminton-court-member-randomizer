export type MemberId = number;
export type CourtMembers = [MemberId, MemberId, MemberId, MemberId];
export type GameMembers = CourtMembers[];
export type History = { members: GameMembers; deleted?: true };
export type PlayCountPerMember = Record<MemberId, number>;

export interface DoublesMemberGenerator {
    readonly courtCount: number;
    readonly courtCapacity: number;
    readonly members: MemberId[];
    readonly histories: History[];
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
