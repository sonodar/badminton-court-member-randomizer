import { BadmintonDoublesMemberGenerator } from "./main";
import { DoublesMemberGenerator } from "./types";
import { array } from "./util";

export type Environment = {
    courtCount: number;
    memberCount: number;
};

export function create({ courtCount, memberCount }: Environment): DoublesMemberGenerator {
    const members = array.generate(memberCount);
    return new BadmintonDoublesMemberGenerator({ courtCount, members });
}

export const util = { array };
export * from "./consts";

export type { GameMembers, History } from "./types";
