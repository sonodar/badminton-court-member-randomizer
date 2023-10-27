import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import GamePane from "@components/game/GamePane.tsx";
import InitialSettingPane from "@components/setting/InitialSettingPane.tsx";
import customTheme from "@components/theme.ts";
import type { Environment } from "@doubles-member-generator/lib";
import React, { useState } from "react";

type PanelState = "init" | "game" | "history";

export default function Main() {
    const [panelState, setPanelState] = useState<PanelState>("init");
    const [environment, setEnvironment] = useState<Environment | null>(null);

    const onStart = (env: Environment) => {
        setEnvironment(env);
        setPanelState("game");
    };

    return (
        <ChakraProvider theme={customTheme}>
            <Container maxW="sm">
                {panelState === "init" && <InitialSettingPane onStart={onStart} />}
                {panelState === "game" && environment && <GamePane initialSetting={environment} />}
            </Container>
        </ChakraProvider>
    );
}
