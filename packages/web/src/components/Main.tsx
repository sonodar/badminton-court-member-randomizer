import { ChakraProvider, Container } from "@chakra-ui/react";
import { util } from "@doubles-member-generator/lib";
import React, { useState } from "react";
import storage from "../store/settingsStorage";
import GamePane from "@components/game/GamePane.tsx";
import InitialSettingPane from "@components/setting/InitialSettingPane.tsx";
import customTheme from "@components/theme.ts";

export default function Main() {
  const [settings, setSettings] = useState(storage.get());
  const [shareId, setShareId] = useState(
    window.localStorage.getItem("shareId"),
  );

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

  const onReset = () => {
    setSettings(null);
    setShareId(null);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Container maxW={"sm"} minW={"sm"}>
        {settings === null && <InitialSettingPane onStart={onStart} />}
        {settings !== null && (
          <GamePane settings={settings} onReset={onReset} shareId={shareId} />
        )}
      </Container>
    </ChakraProvider>
  );
}
