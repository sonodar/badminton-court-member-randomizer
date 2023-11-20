import { ChakraProvider, Container } from "@chakra-ui/react";
import { array, type Algorithm } from "@doubles-member-generator/manager";
import React, { useState } from "react";
import storage from "../util/settingsStorage";
import { parseShareLink } from "../util/shareLink";
import SharedPane from "./shared/SharedPane.tsx";
import { SettingsProvider } from "./state";
import GamePane from "@components/game/GamePane";
import InitialSettingPane from "@components/setting/InitialSettingPane";
import customTheme from "@components/theme";

export default function Main() {
  const sharedId = parseShareLink(window.location);

  if (sharedId) {
    return (
      <ChakraProvider theme={customTheme}>
        <SettingsProvider>
          <Container maxW={"sm"} minW={"sm"}>
            <SharedPane sharedId={sharedId} />
          </Container>
        </SettingsProvider>
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
    algorithm,
  }: {
    courtCount: number;
    memberCount: number;
    algorithm: Algorithm;
  }) => {
    const members = array.generate(memberCount);
    setSettings({
      courtCount,
      members,
      histories: [],
      gameCounts: {},
      algorithm,
    });
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
          <SettingsProvider initialSettings={settings}>
            <GamePane onReset={onReset} shareId={shareId} />
          </SettingsProvider>
        )}
      </Container>
    </ChakraProvider>
  );
}
