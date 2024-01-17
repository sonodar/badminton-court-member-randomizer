import {
  Algorithms,
  type CurrentSettings,
} from "@doubles-member-generator/manager";
import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage, RESET, useReducerAtom } from "jotai/utils";
import {
  gameTutorialReducer,
  settingsTutorialReducer,
  settingsReducer,
} from "./reducer";
import {
  GameTutorialSteps,
  SettingsTutorialSteps,
} from "@components/state/tutor.ts";

const emptySettings: CurrentSettings = {
  courtCount: 0,
  members: [],
  histories: [],
  gameCounts: {},
  algorithm: Algorithms.DISCRETENESS,
};

export const settingsAtom = atomWithStorage("currentSettings", emptySettings);
export const shareIdAtom = atomWithStorage("shareId", "");
export const settingsTutorialAtom = atomWithStorage(
  "settingsTutorial",
  SettingsTutorialSteps.COURT_COUNT,
);
export const gameTutorialAtom = atomWithStorage(
  "gameTutorial",
  GameTutorialSteps.GENERATE,
);

export function useResetAll() {
  const setSettings = useSetAtom(settingsAtom);
  const setShareId = useSetAtom(shareIdAtom);
  return () => {
    setSettings(RESET);
    setShareId(RESET);
  };
}

export const useSettings = () => useAtomValue(settingsAtom);
export const useSettingsReducer = () =>
  useReducerAtom(settingsAtom, settingsReducer);

export const useSettingsTutorialReducer = () =>
  useReducerAtom(settingsTutorialAtom, settingsTutorialReducer);
export const useGameTutorialReducer = () =>
  useReducerAtom(gameTutorialAtom, gameTutorialReducer);

export const useResetTutorial = () => {
  const setSettingsTutorial = useSetAtom(settingsTutorialAtom);
  const setGameTutorial = useSetAtom(gameTutorialAtom);
  return () => {
    setSettingsTutorial(RESET);
    setGameTutorial(RESET);
  };
};
