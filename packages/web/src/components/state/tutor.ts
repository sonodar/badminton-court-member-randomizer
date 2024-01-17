import { match } from "ts-pattern";

export enum SettingsTutorialSteps {
  DONE = -1,
  COURT_COUNT,
  MEMBER_COUNT,
  ALGORITHM,
}

export const SettingsTutor = {
  hasNext(step: SettingsTutorialSteps): boolean {
    return step !== SettingsTutorialSteps.DONE;
  },
  hasPrevious(step: SettingsTutorialSteps): boolean {
    return step > SettingsTutorialSteps.COURT_COUNT;
  },
  toForward(step: SettingsTutorialSteps): SettingsTutorialSteps {
    return match(step)
      .with(SettingsTutorialSteps.DONE, () => SettingsTutorialSteps.DONE)
      .with(SettingsTutorialSteps.ALGORITHM, () => SettingsTutorialSteps.DONE)
      .otherwise(() => step + 1);
  },
  toBack(step: SettingsTutorialSteps): SettingsTutorialSteps {
    return match(step)
      .with(
        SettingsTutorialSteps.COURT_COUNT,
        () => SettingsTutorialSteps.COURT_COUNT,
      )
      .with(SettingsTutorialSteps.DONE, () => SettingsTutorialSteps.ALGORITHM)
      .otherwise(() => step - 1);
  },
};

export enum GameTutorialSteps {
  DONE = -1,
  GENERATE,
  JOIN,
  LEAVE,
  HISTORY,
  PLAY_COUNT,
  SHARE,
  FINISH,
}

export const GameTutor = {
  hasNext(step: GameTutorialSteps): boolean {
    return step !== GameTutorialSteps.DONE;
  },
  hasPrevious(step: GameTutorialSteps): boolean {
    return step > GameTutorialSteps.GENERATE;
  },
  toForward(step: GameTutorialSteps): GameTutorialSteps {
    return match(step)
      .with(GameTutorialSteps.DONE, () => GameTutorialSteps.DONE)
      .with(GameTutorialSteps.FINISH, () => GameTutorialSteps.DONE)
      .otherwise(() => step + 1);
  },
  toBack(step: GameTutorialSteps): GameTutorialSteps {
    return match(step)
      .with(GameTutorialSteps.GENERATE, () => GameTutorialSteps.GENERATE)
      .with(GameTutorialSteps.DONE, () => GameTutorialSteps.FINISH)
      .otherwise(() => step - 1);
  },
};
