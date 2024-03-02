import { match } from "ts-pattern";
import type { CourtMembers, GameMembers } from "./types.ts";

type MemberType = "restMember" | "courtMember";
type RestMember = { type: "restMember"; memberId: number };
type CourtMember = { type: "courtMember"; courtId: number; memberId: number };
export type RestOrCourtMember = RestMember | CourtMember;

export function isMemberType(type: string): type is MemberType {
	return ["restMember", "courtMember"].includes(type);
}

export function swapGameMember(
	gameMembers: GameMembers,
	source: RestOrCourtMember,
	dest: RestOrCourtMember,
): GameMembers | undefined {
	// 交換元メンバーと交換先メンバーが同じ場合は無視
	if (source.memberId === dest.memberId) {
		return;
	}
	return match([source, dest])
		.with([{ type: "restMember" }, { type: "restMember" }], () => undefined)
		.with([{ type: "restMember" }, { type: "courtMember" }], ([source, dest]) =>
			swapCourtMember(gameMembers, source.memberId, dest),
		)
		.with([{ type: "courtMember" }, { type: "restMember" }], ([source, dest]) =>
			swapCourtMember(gameMembers, dest.memberId, source),
		)
		.with(
			[{ type: "courtMember" }, { type: "courtMember" }],
			([source, dest]) => swapOtherCourtMember(gameMembers, source, dest),
		)
		.exhaustive();
}

// 休憩メンバーと参加メンバーを入れ替える
function swapCourtMember(
	gameMembers: GameMembers,
	restMemberId: number,
	dest: CourtMember,
): GameMembers {
	return gameMembers.map((courtMembers, courtId) => {
		if (courtId === dest.courtId) {
			return courtMembers.map((id) =>
				id === dest.memberId ? restMemberId : id,
			) as CourtMembers;
		}
		return courtMembers;
	});
}

// 参加メンバーのコートを入れ替える
function swapOtherCourtMember(
	gameMembers: GameMembers,
	source: CourtMember,
	dest: CourtMember,
): GameMembers | undefined {
	// 同じコートのメンバーを入れ替える場合は無視
	if (source.courtId === dest.courtId) {
		return;
	}
	// 元のデータに影響を与えないようにコピーを作成
	return gameMembers.map((courtMembers, courtId) => {
		// 交換元のコートのメンバーを交換先のメンバーに変更
		if (courtId === source.courtId) {
			return courtMembers.map((id) =>
				id === source.memberId ? dest.memberId : id,
			) as CourtMembers;
		}
		// 交換先のコートのメンバーを交換元のメンバーに変更
		if (courtId === dest.courtId) {
			return courtMembers.map((id) =>
				id === dest.memberId ? source.memberId : id,
			) as CourtMembers;
		}
		// どっちのコートとも関係ない場合は無視 (3コート以上で発生)
		return courtMembers;
	});
}
