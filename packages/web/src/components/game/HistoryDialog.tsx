import React from "react";
import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import type { CurrentSettings } from "@doubles-member-generator/manager";
import HistoryPane from "./HistoryPane";
import { prittyFont } from "@components/theme";

type Props = CurrentSettings & {
  isOpen: boolean;
  onClose: () => void;
};

export function HistoryDialog({ isOpen, onClose, ...settings }: Props) {
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
            <HistoryPane histories={settings.histories} />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
