export type MemberId = number;
export type CourtMembers = [MemberId, MemberId, MemberId, MemberId];
export type GameMembers = CourtMembers[];
export type History = { members: GameMembers; deleted?: true };
export type PlayCount = { playCount: number; baseCount: number };
export type PlayCountPerMember = Record<MemberId, PlayCount>;

export type CurrentSettings = {
    courtCount: number;
    members: MemberId[];
    histories: History[];
    gameCounts: PlayCountPerMember;
};

export interface DoublesMemberGenerator extends CurrentSettings {
    readonly courtCapacity: number;
    readonly memberCount: number;
    next(): GameMembers;
    retry(): GameMembers;
    join(): DoublesMemberGenerator;
    leave(...ids: number[]): DoublesMemberGenerator;
}
