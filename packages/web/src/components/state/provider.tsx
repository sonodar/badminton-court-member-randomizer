import React, { useReducer, type ReactNode } from "react";
import type { CurrentSettings } from "@doubles-member-generator/manager";
import { SettingsContext, SettingsDispatchContext, empty } from "./context";
import { settingsReducer } from "./reducer";

export function SettingsProvider({
  initialSettings = empty,
  children,
}: {
  initialSettings?: CurrentSettings;
  children: ReactNode;
}) {
  const [settings, settingsDispatch] = useReducer(
    settingsReducer,
    initialSettings,
  );

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={settingsDispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}
