import type { Environment } from "@badminton-court-member-randomizer/lib";
import { Center, ChakraProvider, Stack } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import GamePane from "@components/game/GamePane.tsx";
import InitialSettingPane from "@components/setting/InitialSettingPane.tsx";
import React, { useState } from "react";

type PanelState = "init" | "game" | "history";

export default function Main() {
    const [panelState, setPanelState] = useState<PanelState>("init");
    const [environment, setEnvironment] = useState<Environment>({ courtCount: 2, memberCount: 8 });

    const onStart = (env: Environment) => {
        setEnvironment(env);
        setPanelState("game");
    };

    return (
        <ChakraProvider>
            <Container maxW="sm">
                <Center py={4}>
                    <Stack>
                        {panelState === "init" && <InitialSettingPane onStart={onStart} />}
                        {panelState === "game" && <GamePane initialSetting={environment} />}
                    </Stack>
                </Center>
            </Container>
        </ChakraProvider>
    );
}
