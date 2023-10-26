import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Divider, Flex, Heading, Spacer, Stack } from "@chakra-ui/react";
import { CourtCountInput } from "@components/setting/CourtCountInput.tsx";
import { InitMemberCountInput } from "@components/setting/InitMemberCountInput.tsx";
import { COURT_CAPACITY, type Environment } from "@doubles-member-generator/lib";
import React, { useState } from "react";

type Props = {
    onStart: (env: Environment) => Promise<void>;
};

export default function InitialSettingPane({ onStart }: Props) {
    const [courtCount, setCourtCount] = useState(2);
    const [memberCount, setMemberCount] = useState(2 * COURT_CAPACITY);

    const onChangeCourtCount = (courtCount: number) => {
        setCourtCount(courtCount);
        if (memberCount < courtCount * COURT_CAPACITY) setMemberCount(courtCount * COURT_CAPACITY);
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
            <InitMemberCountInput min={courtCount * COURT_CAPACITY} value={memberCount} onChange={setMemberCount} />
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
