import { Modal, ModalContent, Spinner, AbsoluteCenter } from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProgressOverlay({ isOpen, onClose }: Props) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalContent
        backgroundColor={"whiteAlpha.100"}
        backdropFilter="blur(10px) hue-rotate(90deg)"
      >
        <AbsoluteCenter>
          <Spinner size={"xl"} />
        </AbsoluteCenter>
      </ModalContent>
    </Modal>
  );
}
