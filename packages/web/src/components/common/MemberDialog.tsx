import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import MemberCountPane from "./MemberCountPane.tsx";
import { prettyFont } from "@components/theme.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MemberDialog({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={"350px"}>
        <ModalHeader maxH={"xs"} style={{ ...prettyFont }}>
          <Heading as="h3" size="md">
            メンバー
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4} px={1}>
          <Stack>
            <Heading as="h4" size="sm" px={4}>
              プレイ回数 (連続休憩回数)
            </Heading>
            <MemberCountPane showLeftMember={true} />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
