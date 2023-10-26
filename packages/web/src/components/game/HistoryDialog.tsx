import { SmallCloseIcon } from "@chakra-ui/icons";
import {
    Box,
    Divider,
    Flex,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
} from "@chakra-ui/react";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import type { History } from "@doubles-member-generator/lib";
import { util } from "@doubles-member-generator/lib";
import React from "react";

type Props = {
    courtCount: number;
    histories: History[];
    isOpen: boolean;
    onClose: () => void;
};

export function HistoryDialog({ courtCount, histories, isOpen, onClose }: Props) {
    const courtIds = util.array.generate(courtCount, 0);
    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
            <ModalOverlay />
            <ModalContent maxW={"xs"}>
                <ModalHeader maxH={"xs"}>履歴</ModalHeader>
                <ModalCloseButton />
                <ModalBody py={4} px={2}>
                    <Stack spacing={3} divider={<Divider />}>
                        {histories.map((history, index) => (
                            <Box key={history.members.flat().join(",")} px={2}>
                                <div>{index + 1} 回目</div>
                                <CourtMembersPane members={history.members} courtIds={courtIds} />
                            </Box>
                        ))}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
