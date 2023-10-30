export type MemberId = number;
export type CourtMembers = [MemberId, MemberId, MemberId, MemberId];
export type GameMembers = CourtMembers[];
export type History = { members: GameMembers; deleted?: true };
export type PlayCount = { playCount: number; baseCount: number };
export type PlayCountPerMember = Record<MemberId, PlayCount>;

export interface DoublesMemberGenerator {
    readonly courtCount: number;
    readonly courtCapacity: number;
    readonly members: MemberId[];
    readonly memberCount: number;
    readonly histories: History[];
    readonly gameCounts: PlayCountPerMember;
    next(): GameMembers;
    retry(): GameMembers;
    join(): DoublesMemberGenerator;
    leave(...ids: number[]): DoublesMemberGenerator;
}
