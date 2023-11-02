import {
    Box,
    Center,
    Divider,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import { prittyFont } from "@components/theme";
import type { CurrentSettings } from "@doubles-member-generator/lib";
import React from "react";

type Props = CurrentSettings & {
    isOpen: boolean;
    onClose: () => void;
};

export function HistoryDialog({ isOpen, onClose, ...settings }: Props) {
    const histories = settings.histories.map((history, index) => ({ index, history })).reverse();
    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
            <ModalOverlay />
            <ModalContent maxW={"350px"}>
                <ModalHeader maxH={"xs"} style={{ ...prittyFont }}>
                    履歴
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody py={4} px={0}>
                    <Center>
                        <Stack spacing={3} divider={<Divider />}>
                            {histories.map(({ history, index }, i) => (
                                <Box key={history.members.flat().join(",")} px={2}>
                                    <Heading as={"label"} size={"sm"} color={"gray.600"}>
                                        {`${index + 1} 回目`}
                                        {i === 0 && " (前回)"}
                                    </Heading>
                                    <CourtMembersPane members={history.members} single={false} />
                                </Box>
                            ))}
                        </Stack>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
