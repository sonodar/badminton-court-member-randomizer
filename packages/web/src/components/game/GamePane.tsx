import { RepeatClockIcon } from "@chakra-ui/icons";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
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
import ConfirmDialog from "@components/ConfirmDialog.tsx";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import { CurrentMemberCountInput } from "@components/game/CurrentMemberCountInput.tsx";
import { HistoryDialog } from "@components/game/HistoryDialog.tsx";
import { LeaveDialog } from "@components/game/LeaveDialog.tsx";
import type { CurrentSettings, GameMembers } from "@doubles-member-generator/lib";
import { util, create } from "@doubles-member-generator/lib";
import React, { useRef, useState } from "react";
import { IoDiceOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdOutlineWatchLater } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { MemberDialog } from "./MemberDialog";

type Props = {
    settings: CurrentSettings;
    onReset: () => void;
};

export default function GamePane({ settings, onReset }: Props) {
    const courtCount = settings.courtCount;
    const courtIds = util.array.generate(courtCount, 0);

    const [manager, setManager] = useState(create(settings));
    const { isOpen: isLeaveOpen, onOpen: onLeaveOpen, onClose: onLeaveClose } = useDisclosure();
    const [latestMembers, setLatestMembers] = useState<GameMembers>(
        settings.histories[settings.histories.length - 1]?.members || [],
    );

    const { isOpen: isHistoryOpen, onOpen: onHistoryOpen, onClose: onHistoryClose } = useDisclosure();
    const { isOpen: isMemberOpen, onOpen: onMemberOpen, onClose: onMemberClose } = useDisclosure();
    const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const alertCancelRef = useRef<HTMLButtonElement | null>(null);

    const saveSettings = () => {
        window.sessionStorage.setItem("currentSettings", JSON.stringify({ ...manager }));
    };

    const onJoin = () => {
        setManager(manager.join());
        saveSettings();
    };
    const handleGenerate = () => {
        setLatestMembers(manager.next());
        saveSettings();
    };
    const handleRetry = () => {
        setLatestMembers(manager.retry());
        saveSettings();
    };

    const toast = useToast();
    const onLeave = (id: number) => {
        setManager(manager.leave(id));
        saveSettings();
        toast({
            title: `メンバー ${id} が離脱しました`,
            status: "warning",
            duration: 2000,
            isClosable: true,
            colorScheme: "accent",
            variant: "subtle",
        });
    };

    const clear = () => {
        window.sessionStorage.removeItem("currentSettings");
        onReset();
    };

    return (
        <Card my={1} py={4} height={"100dvh"}>
            <CardBody>
                <Center>
                    <Stack spacing={6}>
                        <CurrentMemberCountInput
                            value={manager.memberCount}
                            min={courtCount * 4}
                            onIncrement={onJoin}
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
                                variant={"outline"}
                                leftIcon={<RepeatClockIcon />}
                                size={"xs"}
                                onClick={handleRetry}
                                isDisabled={manager.histories.length === 0}
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
                    size={"sm"}
                    leftIcon={<MdOutlineWatchLater />}
                    isDisabled={manager.histories.length === 0}
                    onClick={onHistoryOpen}
                >
                    履歴
                </Button>
                <Spacer />
                <Button
                    size={"sm"}
                    leftIcon={<TbUsers />}
                    isDisabled={manager.histories.length === 0}
                    onClick={onMemberOpen}
                >
                    メンバー
                </Button>
                <Spacer />
                <Button size={"sm"} colorScheme={"red"} leftIcon={<MdOutlineDeleteOutline />} onClick={onAlertOpen}>
                    削除
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
            <ConfirmDialog
                isOpen={isAlertOpen}
                onCancel={onAlertClose}
                onOk={() => {
                    onAlertClose();
                    clear();
                }}
                cancelRef={alertCancelRef}
                title={"初期化の確認"}
            >
                設定および履歴を削除して最初からやり直します。本当によろしいですか？
            </ConfirmDialog>
        </Card>
    );
}
