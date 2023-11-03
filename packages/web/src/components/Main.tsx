import { ChakraProvider, Container } from "@chakra-ui/react";
import type { CurrentSettings } from "@doubles-member-generator/lib";
import { util } from "@doubles-member-generator/lib";
import React, { useState } from "react";
import GamePane from "@components/game/GamePane.tsx";
import InitialSettingPane from "@components/setting/InitialSettingPane.tsx";
import customTheme from "@components/theme.ts";

export default function Main() {
  let initialSettings: CurrentSettings | null = null;

  const settingsJson = window.localStorage.getItem("currentSettings");
  if (settingsJson) {
    initialSettings = JSON.parse(settingsJson);
  }

  const [settings, setSettings] = useState(initialSettings);

  const onStart = ({
    courtCount,
    memberCount,
  }: {
    courtCount: number;
    memberCount: number;
  }) => {
    const members = util.array.generate(memberCount);
    setSettings({ courtCount, members, histories: [], gameCounts: {} });
  };

  const onReset = () => setSettings(null);

  return (
    <ChakraProvider theme={customTheme}>
      <Container maxW={"sm"} minW={"sm"}>
        {settings === null && <InitialSettingPane onStart={onStart} />}
        {settings !== null && (
          <GamePane settings={settings} onReset={onReset} />
        )}
      </Container>
    </ChakraProvider>
  );
}
