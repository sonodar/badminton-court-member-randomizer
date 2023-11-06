import { ChakraProvider, Container } from "@chakra-ui/react";
import { util } from "@doubles-member-generator/lib";
import React, { useState } from "react";
import storage from "../util/settingsStorage";
import SharedPane from "./game/SharedPane";
import GamePane from "@components/game/GamePane.tsx";
import InitialSettingPane from "@components/setting/InitialSettingPane.tsx";
import customTheme from "@components/theme.ts";
import { parseShareLink } from "src/util/shareLink";

export default function Main() {
  const sharedId = parseShareLink(window.location);

  if (sharedId) {
    return (
      <ChakraProvider theme={customTheme}>
        <Container maxW={"sm"} minW={"sm"}>
          <SharedPane sharedId={sharedId} />
        </Container>
      </ChakraProvider>
    );
  }

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
