import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Button,
    Card,
    CardBody,
    Center,
    Divider,
    Flex,
    Heading,
    IconButton,
    Link,
    Spacer,
    Stack,
} from "@chakra-ui/react";
import { CourtCountInput } from "@components/setting/CourtCountInput.tsx";
import { InitMemberCountInput } from "@components/setting/InitMemberCountInput.tsx";
import { COURT_CAPACITY, type Environment } from "@doubles-member-generator/lib";
import React, { useState } from "react";
import { ImGithub } from "react-icons/im";
import { GiShuttlecock } from "react-icons/gi";

type Props = {
    onStart: (env: Environment) => void;
};

export default function InitialSettingPane({ onStart }: Props) {
    const [courtCount, setCourtCount] = useState(2);
    const [memberCount, setMemberCount] = useState(2 * COURT_CAPACITY);

    const onChangeCourtCount = (courtCount: number) => {
        setCourtCount(courtCount);
        if (memberCount < courtCount * COURT_CAPACITY) setMemberCount(courtCount * COURT_CAPACITY);
    };

    return (
        <Card my={1} py={4} height={"100dvh"}>
            <CardBody>
                <Center>
                    <Stack spacing={6}>
                        <Heading as="h1" size="sm">
                            ダブルスメンバー決めるくん
                        </Heading>
                        <Heading as="h2" size="xl">
                            初期設定
                        </Heading>
                        <Heading as="h3" size="md">
                            コート数（後から変更不可）
                        </Heading>
                        <CourtCountInput value={courtCount} onChange={onChangeCourtCount} />
                        <Heading as="h3" size="md">
                            開始メンバー数
                        </Heading>
                        <InitMemberCountInput
                            min={courtCount * COURT_CAPACITY}
                            value={memberCount}
                            onChange={setMemberCount}
                        />
                        <Divider />
                        <Flex>
                            <Link
                                target={"_blank"}
                                href={"https://github.com/sonodar/badminton-court-member-randomizer"}
                            >
                                <IconButton aria-label={"github"} icon={<ImGithub />} />
                            </Link>
                            <Spacer />
                            <Button
                                leftIcon={<GiShuttlecock />}
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme={"brand"}
                                variant="outline"
                                onClick={() => onStart({ courtCount, memberCount })}
                            >
                                開始
                            </Button>
                        </Flex>
                    </Stack>
                </Center>
            </CardBody>
        </Card>
    );
}
