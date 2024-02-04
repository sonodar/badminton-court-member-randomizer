import type { CurrentSettings, GameMembers } from "./types";
import { addHistory } from "./generate";

export function replace(
  settings: CurrentSettings,
  gameMembers: GameMembers,
): CurrentSettings {
  if (settings.histories.length === 0) {
    return addHistory(settings, gameMembers);
  }

  const histories = [...settings.histories];
  histories.pop();

  return addHistory({ ...settings, histories }, gameMembers);
}
