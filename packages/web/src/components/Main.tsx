import { ChakraProvider, Container } from "@chakra-ui/react";
import { array, type Algorithm } from "@doubles-member-generator/manager";
import React from "react";
import { Provider, createStore, useAtom } from "jotai";
import { parseShareLink } from "../util/shareLink";
import SharedPane from "./shared/SharedPane.tsx";
import { settingsAtom, useResetAll } from "./state/index.ts";
import GamePane from "@components/game/GamePane";
import InitialSettingPane from "@components/setting/InitialSettingPane";
import customTheme from "@components/theme";

export default function Main() {
  const store = createStore();
  const sharedId = parseShareLink(window.location);

  if (sharedId) {
    return (
      <ChakraProvider theme={customTheme}>
        <Provider store={store}>
          <Container maxW={"sm"} minW={"sm"}>
            <SharedPane sharedId={sharedId} />
          </Container>
        </Provider>
      </ChakraProvider>
    );
  }

  const [settings, setSettings] = useAtom(settingsAtom);

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

  const onReset = useResetAll();

  return (
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <Container maxW={"sm"} minW={"sm"}>
          {settings.courtCount === 0 && (
            <InitialSettingPane onStart={onStart} />
          )}
          {settings.courtCount !== 0 && <GamePane onReset={onReset} />}
        </Container>
      </Provider>
    </ChakraProvider>
  );
}
