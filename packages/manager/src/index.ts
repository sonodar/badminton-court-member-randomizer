import { BadmintonDoublesMemberGenerator } from "./main";
import type { CurrentSettings, DoublesMemberGenerator } from "./types";
import { array } from "./util";

export function create(settings: CurrentSettings): DoublesMemberGenerator {
  return new BadmintonDoublesMemberGenerator({ ...settings });
}

export const util = { array };
export * from "./consts";

export type {
  CurrentSettings,
  CourtMembers,
  GameMembers,
  History,
  PlayCountPerMember,
} from "./types";
