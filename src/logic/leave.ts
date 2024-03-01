import type { CurrentSettings, History } from "./types";

export function leave(
	settings: CurrentSettings,
	...ids: number[]
): CurrentSettings {
	const newSettings = structuredClone(settings);

	// 抜けた人が含まれる履歴に削除マークをつける
	newSettings.histories = markLeftMembersHistory(newSettings.histories, ids);

	newSettings.members = newSettings.members.filter((id) => !ids.includes(id));

	return newSettings;
}

function markLeftMembersHistory(
	histories: History[],
	ids: number[],
): History[] {
	return histories.map((history) =>
		history.members.flat().some((id) => ids.includes(id))
			? { ...history, deleted: true }
			: history,
	);
}
