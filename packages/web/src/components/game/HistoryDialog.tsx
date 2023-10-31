import {
    Box,
    Center,
    Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import type { CurrentSettings } from "@doubles-member-generator/lib";
import { util } from "@doubles-member-generator/lib";
import React from "react";

type Props = CurrentSettings & {
    isOpen: boolean;
    onClose: () => void;
};

export function HistoryDialog({ courtCount, histories, isOpen, onClose }: Props) {
    const courtIds = util.array.generate(courtCount, 0);
    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
            <ModalOverlay />
            <ModalContent maxW={"350px"}>
                <ModalHeader maxH={"xs"}>履歴</ModalHeader>
                <ModalCloseButton />
                <ModalBody py={4} px={0}>
                    <Center>
                        <Stack spacing={3} divider={<Divider />}>
                            {histories.map((history, index) => (
                                <Box key={history.members.flat().join(",")} px={2}>
                                    <div>{index + 1} 回目</div>
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
