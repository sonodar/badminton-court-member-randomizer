import type {
  CurrentSettings,
  GameMembers,
  History,
  MemberId,
  PlayCountPerMember,
} from "./types";
import { array } from "./array";
import { COURT_CAPACITY } from "./consts";
import { selectRandomMembers } from "./util";

type Item = { id: number; count: number };

// 均等性重視の場合は参加回数でソートして少ない順に選出
export function getEvennessRandomMembers({
  courtCount,
  ...settings
}: CurrentSettings): GameMembers {
  const members = sortMembers(settings);

  const playMembers = members.slice(0, courtCount * COURT_CAPACITY);
  const restMembers = members.slice(playMembers.length);

  if (restMembers.length === 0) {
    return getRandomMembers(courtCount, playMembers);
  }

  const lastPlayMember = playMembers[playMembers.length - 1];
  const [firstRestMember] = restMembers;

  // 選出メンバーの末尾と休憩メンバーの先頭がきれいに分かれていたら選出メンバーをそのまま返す
  if (lastPlayMember.count < firstRestMember.count) {
    return getRandomMembers(courtCount, playMembers);
  }

  // 末尾と先頭が同じ値だったらその回数値のメンバーを洗い出す
  const threshold = lastPlayMember.count;

  // 絶対に参加可能なメンバー
  const exactlyPlayMemberIds = playMembers
    .filter(({ count }) => count < threshold)
    .map(id);

  // 必ず参加できるかどうかグレーなメンバー
  const sameCountMemberIds = members
    .filter(({ count }) => count === threshold)
    .map(id);

  // 最終的なメンバーは必ず参加可能なメンバー + 同回数のメンバー内からランダム選出されたメンバー
  const finallySelectedMembers = exactlyPlayMemberIds
    .concat(array.shuffle(sameCountMemberIds))
    .slice(0, courtCount * COURT_CAPACITY);

  return selectRandomMembers({ courtCount, members: finallySelectedMembers });
}

// 参加回数でメンバーをソート
function sortMembers({
  members,
  gameCounts,
}: Pick<CurrentSettings, "members" | "gameCounts">): Item[] {
  return members
    .map((id) => ({ id, count: getPlayCount(gameCounts, id) }))
    .sort((i1, i2) => i1.count - i2.count);
}

function getPlayCount(gameCounts: PlayCountPerMember, id: MemberId) {
  return (gameCounts[id]?.playCount || 0) + (gameCounts[id]?.baseCount || 0);
}

function id(item: Item) {
  return item.id;
}

function getRandomMembers(courtCount: number, members: Item[]) {
  return selectRandomMembers({ courtCount, members: members.map(id) });
}

export function useIsEvenness(settings: CurrentSettings) {
  if (settings.algorithm !== "EVENNESS") {
    return () => true;
  }

  // 許容される連続休憩回数
  const surplusLimit = getSurplusLimit(settings);

  return (generated: GameMembers) => {
    const restMembers = getRestMembers(settings, generated);
    const restCounts = getContinuousRestCounts(settings.histories, restMembers);
    console.log("連続休憩回数", restCounts);
    return !restCounts.some(({ count }) => count > surplusLimit);
  };
}

// 連続休憩回数の許容回数を算出する
// (休憩メンバー数 / 4)の切り上げ: 3 => 1, 4 => 1, 5 => 2, 0 => 0
function getSurplusLimit(settings: CurrentSettings) {
  const maxPlayerCount = settings.courtCount * COURT_CAPACITY;
  const surplusCount = settings.members.length - maxPlayerCount;
  return Math.ceil(surplusCount / COURT_CAPACITY);
}

function getRestMembers(
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

function getContinuousRestCounts(
  histories: History[],
  restMembers: MemberId[],
): Item[] {
  return restMembers.reduce((counts, id) => {
    const count = getContinuousRestCount(histories, id);
    counts.push({ id, count });
    return counts;
  }, [] as Item[]);
}
