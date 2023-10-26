import { BadmintonDoublesMemberGenerator } from "./main";
import { DoublesMemberGenerator, Environment } from "./types";
import { array } from "./util";

export function create({ courtCount, memberCount }: Environment): DoublesMemberGenerator {
    const members = array.generate(memberCount);
    return new BadmintonDoublesMemberGenerator({ courtCount, members });
}

export const util = { array };
