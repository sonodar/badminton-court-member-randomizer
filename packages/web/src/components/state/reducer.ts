import {
  type CurrentSettings,
  join,
  leave,
  replayGenerate,
  replayRetry,
} from "@doubles-member-generator/manager";
import { match } from "ts-pattern";
import type { EventPayload } from "@doubles-member-generator/api";
import type { SettingsTutorialSteps, GameTutorialSteps } from "./tutor.ts";
import { SettingsTutor, GameTutor } from "./tutor.ts";

export function settingsReducer(
  settings: CurrentSettings,
  action: EventPayload,
): CurrentSettings {
  return match(action)
    .with({ type: "INITIALIZE" }, ({ payload }) => payload)
    .with({ type: "JOIN" }, () => join(settings))
    .with({ type: "LEAVE" }, ({ payload }) => leave(settings, payload.memberId))
    .with({ type: "GENERATE" }, ({ payload }) =>
      replayGenerate(settings, payload.members),
    )
    .with({ type: "RETRY" }, ({ payload }) =>
      replayRetry(settings, payload.members),
    )
    .with({ type: "FINISH" }, () => settings)
    .exhaustive();
}

export function settingsTutorialReducer(
  step: SettingsTutorialSteps,
  action: "next" | "back",
): SettingsTutorialSteps {
  return match(action)
    .with("next", () => SettingsTutor.toForward(step))
    .with("back", () => SettingsTutor.toBack(step))
    .exhaustive();
}

export function gameTutorialReducer(
  step: GameTutorialSteps,
  action: "next" | "back",
): GameTutorialSteps {
  return match(action)
    .with("next", () => GameTutor.toForward(step))
    .with("back", () => GameTutor.toBack(step))
    .exhaustive();
}
