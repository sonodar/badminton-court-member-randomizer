import {
  Algorithms,
  type CurrentSettings,
} from "@doubles-member-generator/manager";
import { useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage, RESET, useReducerAtom } from "jotai/utils";
import { settingsReducer } from "./reducer";

const emptySettings: CurrentSettings = {
  courtCount: 0,
  members: [],
  histories: [],
  gameCounts: {},
  algorithm: Algorithms.DISCRETENESS,
};

// const onBoardingAtom = atomWithStorage("onBoarding", { step: 0 });
export const settingsAtom = atomWithStorage("currentSettings", emptySettings);
export const previousSettingsAtom = atomWithStorage<CurrentSettings | null>(
  "previousSettings",
  null,
);
export const shareIdAtom = atomWithStorage("shareId", "");

export function useResetAll() {
  const setSettings = useSetAtom(settingsAtom);
  const setShareId = useSetAtom(shareIdAtom);
  return () => {
    setSettings(RESET);
    setShareId(RESET);
  };
}

export const useSettings = () => useAtomValue(settingsAtom);
export const setSettings = (settings: CurrentSettings) =>
  useSetAtom(settingsAtom)(settings);
export const useSettingsReducer = () =>
  useReducerAtom(settingsAtom, settingsReducer);

export const getPreviousSettings = () => useAtomValue(previousSettingsAtom);
