import type { CurrentSettings, GameMembers, PlayCountPerMember } from "./types";
import { getLatestMembers, toHistoryKey } from "./util";
import { generate } from "./generate";

export function retry(settings: CurrentSettings): CurrentSettings {
  if (settings.histories.length === 0) {
    throw new Error("履歴がないためリトライできません");
  }

  const previousSettings = structuredClone(settings);

  const latestHistory = previousSettings.histories.pop()!;
  previousSettings.gameCounts = decrementGameCounts(
    previousSettings.gameCounts,
    latestHistory.members,
  );

  const newSettings = generate(previousSettings);
  const members = getLatestMembers(newSettings)!;

  // 同じだったらリトライの意味がないので再帰
  if (toHistoryKey(latestHistory.members) === toHistoryKey(members)) {
    return retry(settings);
  }

  return newSettings;
}

function decrementGameCounts(
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
