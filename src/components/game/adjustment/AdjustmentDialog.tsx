import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { type CurrentSettings, type GameMembers, replace } from "@logic";
import { AdjustmentPane } from "@components/game/adjustment/AdjustmentPane.tsx";
import MemberCountPane from "@components/common/MemberCountPane.tsx";

type Props = {
  settings: CurrentSettings;
  isOpen: boolean;
  onClose: () => void;
  onChange: (settings: CurrentSettings) => void;
};

export function AdjustmentDialog({
  settings,
  isOpen,
  onClose,
  onChange,
}: Props) {
  const [newSettings, setNewSettings] = useState(settings);

  const handleAdjust = (gameMembers: GameMembers) => {
    const settings = replace(newSettings, gameMembers);
    setNewSettings(settings);
  };

  const handleOk = () => {
    onChange(newSettings);
    onClose();
  };

  const handleCancel = () => {
    setNewSettings(settings);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      scrollBehavior={"inside"}
      isCentered
      motionPreset={"slideInTop"}
    >
      <ModalOverlay />
      <ModalContent maxW={"350px"} maxH={"100dvh"}>
        <ModalHeader>
          <Stack spacing={3}>
            <Heading as={"h3"} size={"md"}>
              プレイ回数
            </Heading>
          </Stack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={0} px={2} mt={-2}>
          <Stack spacing={4}>
            <MemberCountPane settings={newSettings} />
            <Center>
              <AdjustmentPane {...newSettings} onChange={handleAdjust} />
            </Center>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            w={"45%"}
            colorScheme={"brand"}
            leftIcon={<IoMdDownload />}
            onClick={handleOk}
            size={"sm"}
            rounded={"full"}
          >
            調整反映
          </Button>
          <Spacer />
          <Button
            w={"45%"}
            variant={"outline"}
            leftIcon={<MdOutlineCancel />}
            onClick={handleCancel}
            size={"sm"}
            rounded={"full"}
          >
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
