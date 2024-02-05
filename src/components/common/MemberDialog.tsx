import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import MemberCountPane from "./MemberCountPane.tsx";
import { type CurrentSettings } from "@logic";

type Props = {
  settings?: CurrentSettings;
  defaultTabIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  showLeftMember?: boolean;
};

export function MemberDialog({
  settings,
  defaultTabIndex,
  isOpen,
  onClose,
  showLeftMember,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
      isCentered
      motionPreset={"slideInTop"}
    >
      <ModalOverlay />
      <ModalContent maxW={"350px"}>
        <ModalHeader>
          <Heading as={"label"} size={"sm"}>
            プレイ回数・休憩回数
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={0} px={2} mt={-2}>
          <MemberCountPane
            settings={settings}
            showLeftMember={showLeftMember}
            defaultTabIndex={defaultTabIndex}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
