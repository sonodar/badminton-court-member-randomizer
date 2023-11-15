import type { CurrentSettings, GameMembers, PlayCountPerMember } from "./types";
import { getLatestMembers, toHistoryKey } from "./util";
import { addHistory, generate } from "./generate";

export function retry(settings: CurrentSettings): CurrentSettings {
  if (settings.histories.length === 0) {
    throw new Error("履歴がないためリトライできません");
  }

  const latestMembers = getLatestMembers(settings)!;
  const previousSettings = removeLatestHistory(settings);

  const newSettings = generate(previousSettings);
  const members = getLatestMembers(newSettings)!;

  // 同じだったらリトライの意味がないので再帰
  if (toHistoryKey(latestMembers) === toHistoryKey(members)) {
    return retry(settings);
  }

  return newSettings;
}

export function removeLatestHistory(settings: CurrentSettings) {
  const newSettings = structuredClone(settings);
  const latestHistory = newSettings.histories.pop()!;
  newSettings.gameCounts = decrement(
    newSettings.gameCounts,
    latestHistory.members,
  );
  return newSettings;
}
export function replayRetry(settings: CurrentSettings, members: GameMembers) {
  const prevSettings = removeLatestHistory(settings);
  return addHistory(prevSettings, members);
}

function decrement(
  gameCounts: PlayCountPerMember,
  members: GameMembers,
): PlayCountPerMember {
  const result = { ...gameCounts };
  for (const id of members.flat()) {
    const playCount = Math.max(0, (result[id]?.playCount || 0) - 1);
    const baseCount = result[id]?.baseCount || 0;
    result[id] = { playCount, baseCount };
  }
  return result;
}
