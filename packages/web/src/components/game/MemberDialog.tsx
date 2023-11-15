import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import MemberCountPane from "./MemberCountPane";
import { prittyFont } from "@components/theme";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MemberDialog({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={"350px"}>
        <ModalHeader maxH={"xs"} style={{ ...prittyFont }}>
          メンバー
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4} px={1}>
          <MemberCountPane />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
