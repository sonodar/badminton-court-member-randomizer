import { Button, Divider, HStack, Modal, ModalBody, ModalContent, ModalOverlay, Select, Stack } from "@chakra-ui/react";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import type { History } from "@doubles-member-generator/lib";
import { util } from "@doubles-member-generator/lib";
import React, { useState } from "react";

type Props = {
    courtCount: number;
    histories: History[];
    isOpen: boolean;
    onClose: () => void;
};

export function HistoryDialog({ courtCount, histories, isOpen, onClose }: Props) {
    const courtIds = util.array.generate(courtCount, 0);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody py={4}>
                    <Stack>
                        {histories.map((history, index) => (
                            <div key={history.members.flat().join(",")}>
                                {index !== 0 && <Divider mt={2} />}
                                {index + 1}
                                <CourtMembersPane members={history.members} courtIds={courtIds} />
                            </div>
                        ))}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
