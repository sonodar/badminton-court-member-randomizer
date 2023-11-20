import type { CurrentSettings, GameMembers } from "./types";
import { array } from "./array";
import { COURT_CAPACITY } from "./consts";

export function toHistoryKey(members: GameMembers): string {
  return array.sortMatrix(members).flat().join(",");
}

export function makeHistoryKeys(settings: CurrentSettings): Set<string> {
  return new Set(
    settings.histories.map((history) => toHistoryKey(history.members)),
  );
}

export function selectRandomMembers({
  courtCount,
  members,
}: {
  courtCount: number;
  members: number[];
}): GameMembers {
  const playMembers = array
    .shuffle(members)
    .slice(0, courtCount * COURT_CAPACITY);
  return array.chunks(playMembers, COURT_CAPACITY) as GameMembers;
}

export function rotateFirstHistory(settings: CurrentSettings): CurrentSettings {
  const newSettings = structuredClone(settings);
  const [first, ...histories] = newSettings.histories;
  newSettings.histories = [...histories, first];
  return newSettings;
}

export function getLatestMembers(settings: CurrentSettings) {
  if (settings.histories.length === 0) return;
  const history = settings.histories[settings.histories.length - 1];
  return structuredClone(history.members);
}
