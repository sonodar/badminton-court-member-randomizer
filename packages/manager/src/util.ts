import type { CurrentSettings, GameMembers, History, MemberId } from "./types";
import { array } from "./array";
import { COURT_CAPACITY } from "./consts";

export type CountPerMember = { id: number; count: number };

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
  return array.sortInnerItems(
    array.chunks(playMembers, COURT_CAPACITY),
  ) as GameMembers;
}

export function rotateFirstHistory(settings: CurrentSettings): CurrentSettings {
  const newSettings = structuredClone(settings);
  const [first, ...histories] = newSettings.histories;
  newSettings.histories = [...histories, first];
  return newSettings;
}

export function getLatestMembers({
  histories,
}: Pick<CurrentSettings, "histories">) {
  if (histories.length === 0) return;
  const history = histories[histories.length - 1];
  return structuredClone(history.members);
}

export function getRestMembers(
  { members }: { members: number[] },
  current: GameMembers,
): number[] {
  const playMembers = current.flat();
  return members.filter((id) => !playMembers.includes(id));
}

// 履歴を直近から走査し、連続で休憩している回数を算出する
function getContinuousRestCount(
  histories: History[],
  memberId: number,
): number {
  const lastIndex = histories.findLastIndex((history) =>
    history.members.flat().includes(memberId),
  );
  return histories.length - 1 - lastIndex;
}

export function getContinuousRestCounts(
  histories: History[],
  restMembers: MemberId[],
) {
  return restMembers.reduce((counts, id) => {
    const count = getContinuousRestCount(histories, id);
    counts.push({ id, count });
    return counts;
  }, [] as CountPerMember[]);
}
