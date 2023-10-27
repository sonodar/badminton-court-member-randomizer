import { RepeatClockIcon } from "@chakra-ui/icons";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Center,
    HStack,
    Spacer,
    Stack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import { CurrentMemberCountInput } from "@components/game/CurrentMemberCountInput.tsx";
import { HistoryDialog } from "@components/game/HistoryDialog.tsx";
import { LeaveDialog } from "@components/game/LeaveDialog.tsx";
import type { Environment, GameMembers } from "@doubles-member-generator/lib";
import { util, create } from "@doubles-member-generator/lib";
import React, { useState } from "react";
import { IoDiceOutline } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { MemberDialog } from "./MemberDialog";

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
    const { isOpen: isMemberOpen, onOpen: onMemberOpen, onClose: onMemberClose } = useDisclosure();

    const handleGenerate = () => setLatestMembers(manager.next());
    const handleRetry = () => setLatestMembers(manager.retry());

    const toast = useToast();
    const onLeave = (id: number) => {
        setManager(manager.leave(id));
        toast({
            title: `メンバー ${id} が離脱しました`,
            status: "warning",
            duration: 2000,
            isClosable: true,
        });
    };

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
                            onLeave={onLeave}
                        />
                        <HStack>
                            <Button colorScheme={"brand"} leftIcon={<IoDiceOutline />} onClick={handleGenerate}>
                                メンバー決め
                            </Button>
                            <Spacer />
                            <Button
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
                <Button leftIcon={<TbUsers />} isDisabled={manager.histories.length === 0} onClick={onMemberOpen}>
                    メンバー
                </Button>
            </CardFooter>
            <HistoryDialog
                courtCount={manager.courtCount}
                histories={manager.histories}
                isOpen={isHistoryOpen}
                onClose={onHistoryClose}
            />
            <MemberDialog
                members={manager.members}
                gameCounts={manager.gameCounts}
                isOpen={isMemberOpen}
                onClose={onMemberClose}
            />
        </Card>
    );
}
