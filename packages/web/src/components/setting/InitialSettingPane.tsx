import type { Environment } from "@badminton-court-member-randomizer/lib";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Divider, Flex, Heading, Spacer, Stack } from "@chakra-ui/react";
import { CourtCountInput } from "@components/setting/CourtCountInput.tsx";
import { InitMemberCountInput } from "@components/setting/InitMemberCountInput.tsx";
import React, { useState } from "react";

type Props = {
    onStart: (env: Environment) => void | Promise<void>;
};

export default function InitialSettingPane({ onStart }: Props) {
    const [courtCount, setCourtCount] = useState(2);
    const [memberCount, setMemberCount] = useState(8);

    const onChangeCourtCount = (courtCount: number) => {
        setCourtCount(courtCount);
        if (memberCount < courtCount * 4) setMemberCount(courtCount * 4);
    };

    return (
        <Stack spacing={6}>
            <Heading as="h1" size="xl">
                環境設定
            </Heading>
            <Heading as="h3" size="lg">
                コート数
            </Heading>
            <CourtCountInput value={courtCount} onChange={onChangeCourtCount} />
            <Heading as="h3" size="lg">
                開始メンバー数
            </Heading>
            <InitMemberCountInput min={courtCount * 4} value={memberCount} onChange={setMemberCount} />
            <Divider />
            <Flex>
                <Spacer />
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => onStart({ courtCount, memberCount })}
                >
                    開始
                </Button>
            </Flex>
        </Stack>
    );
}
