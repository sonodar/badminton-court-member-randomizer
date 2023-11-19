import { createContext, useContext, type Dispatch } from "react";
import type {
  CurrentSettings,
  GameMembers,
} from "@doubles-member-generator/manager";
import { getLatestMembers } from "@doubles-member-generator/manager";
import { EventType, type EventPayload } from "@doubles-member-generator/api";

export const empty: CurrentSettings = {
  courtCount: 0,
  members: [],
  histories: [],
  gameCounts: {},
  algorithm: "DISCRETENESS",
};

export const SettingsContext = createContext<CurrentSettings>(empty);
export const useSettings = () => useContext(SettingsContext);
export const useLatestMembers = () => getLatestMembers(useSettings());

export const SettingsDispatchContext = createContext<Dispatch<EventPayload>>(
  () => undefined,
);

export const useSettingsDispatcher = () => {
  const dispatch = useContext(SettingsDispatchContext);
  return {
    initialize: (settings: CurrentSettings) =>
      dispatch({ type: EventType.Initialize, payload: settings }),
    generate: (members: GameMembers) =>
      dispatch({ type: EventType.Generate, payload: { members } }),
    retry: (members: GameMembers) =>
      dispatch({ type: EventType.Retry, payload: { members } }),
    join: () => dispatch({ type: EventType.Join }),
    leave: (memberId: number) =>
      dispatch({ type: EventType.Leave, payload: { memberId } }),
  };
};
