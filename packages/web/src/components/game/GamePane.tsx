import { RepeatClockIcon } from "@chakra-ui/icons";
import { Button, Card, CardBody, CardFooter, Center, HStack, Spacer, Stack, useDisclosure } from "@chakra-ui/react";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import { CurrentMemberCountInput } from "@components/game/CurrentMemberCountInput.tsx";
import { HistoryDialog } from "@components/game/HistoryDialog.tsx";
import { LeaveDialog } from "@components/game/LeaveDialog.tsx";
import type { Environment, GameMembers } from "@doubles-member-generator/lib";
import { util, create } from "@doubles-member-generator/lib";
import React, { useState } from "react";
import { MdNumbers, MdOutlineWatchLater, MdShuffle } from "react-icons/md";

type Props = {
    initialSetting: Environment;
};

export default function GamePane({ initialSetting }: Props) {
    const courtCount = initialSetting.courtCount;
    const courtIds = util.array.generate(courtCount, 0);

    const [manager, setManager] = useState(create(initialSetting));
    const { isOpen: isLeaveOpen, onOpen: onLeaveOpen, onClose: onLeaveClose } = useDisclosure();
    const [latestMembers, setLatestMembers] = useState<GameMembers>([]);

    const { isOpen: isHistoryOpen, onOpen: onHistoryOpen, onClose: onHistoryClose } = useDisclosure();

    const handleGenerate = () => setLatestMembers(manager.next());
    const handleRetry = () => setLatestMembers(manager.retry());

    return (
        <Card my={1} py={4} height={"100dvh"}>
            <CardBody>
                <Center>
                    <Stack spacing={6}>
                        <CurrentMemberCountInput
                            value={manager.memberCount}
                            min={courtCount * 4}
                            onIncrement={() => setManager(manager.join())}
                            onDecrement={onLeaveOpen}
                        />
                        <LeaveDialog
                            members={manager.members}
                            isOpen={isLeaveOpen}
                            onClose={onLeaveClose}
                            onLeave={(id) => setManager(manager.leave(id))}
                        />
                        <HStack>
                            <Button colorScheme={"blue"} leftIcon={<MdShuffle />} onClick={handleGenerate}>
                                払い出し
                            </Button>
                            <Spacer />
                            <Button
                                colorScheme={"red"}
                                leftIcon={<RepeatClockIcon />}
                                size={"xs"}
                                onClick={handleRetry}
                            >
                                やり直し
                            </Button>
                        </HStack>
                        <CourtMembersPane members={latestMembers} courtIds={courtIds} />
                    </Stack>
                </Center>
            </CardBody>
            <CardFooter>
                <Button
                    leftIcon={<MdOutlineWatchLater />}
                    isDisabled={manager.histories.length === 0}
                    onClick={onHistoryOpen}
                >
                    履歴
                </Button>
                <Spacer />
                <Button leftIcon={<MdNumbers />} isDisabled={manager.histories.length === 0}>
                    回数
                </Button>
            </CardFooter>
            <HistoryDialog
                courtCount={manager.courtCount}
                histories={manager.histories}
                isOpen={isHistoryOpen}
                onClose={onHistoryClose}
            />
        </Card>
    );
}
