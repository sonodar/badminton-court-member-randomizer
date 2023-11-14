import type { CurrentSettings, GameMembers } from "./types";
import { array } from "./array";

export function toHistoryKey(members: GameMembers): string {
  return array.sortMatrix(members).flat().join(",");
}

export function getLatestMembers(settings: CurrentSettings) {
  if (settings.histories.length === 0) return;
  const history = settings.histories[settings.histories.length - 1];
  return structuredClone(history.members);
}
