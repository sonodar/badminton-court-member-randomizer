import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import type { PlayCountPerMember } from "@doubles-member-generator/lib";
import React from "react";
import MemberCountPane from "./MemberCountPane";

type Props = {
    members: number[];
    gameCounts: PlayCountPerMember;
    isOpen: boolean;
    onClose: () => void;
};

export function MemberDialog({ members, gameCounts, isOpen, onClose }: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent maxW={"350px"}>
                <ModalHeader maxH={"xs"}>メンバー</ModalHeader>
                <ModalCloseButton />
                <ModalBody py={4} px={1}>
                    <MemberCountPane members={members} gameCounts={gameCounts} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
