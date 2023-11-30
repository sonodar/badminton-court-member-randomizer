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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoDiceOutline } from "react-icons/io5";
import type { CurrentSettings } from "@doubles-member-generator/manager";
import { generate, retry } from "@doubles-member-generator/manager";
import { CheckIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { StatisticsPane } from "@components/game/StatisticsPane.tsx";

type Props = {
  settings: CurrentSettings;
  onGenerate: (settings: CurrentSettings) => void;
  isDisabled?: boolean;
};

export function GenerateButton({ settings, onGenerate, isDisabled }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newSettings, setNewSettings] = useState<CurrentSettings | undefined>();

  const handleClick = () => {
    setNewSettings(generate(settings));
    onOpen();
  };

  const handleOk = () => {
    onGenerate(newSettings || settings);
    onClose();
  };

  const handleRetry = () => {
    setNewSettings(retry(newSettings!));
    onOpen();
  };

  return (
    <Center>
      <Button
        w={"80%"}
        size={"lg"}
        colorScheme={"brand"}
        fontSize={"xl"}
        leftIcon={<IoDiceOutline />}
        onClick={handleClick}
        isDisabled={isDisabled}
      >
        メンバー決め
      </Button>
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
            <Stack spacing={3}>
              <Heading as={"h3"} size={"md"}>
                メンバー選出
              </Heading>
              <Text fontSize={"sm"}>
                以下の内容で確定します。よろしいですか？
              </Text>
            </Stack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} mb={1}>
            <Center>
              <Stack spacing={6} px={2}>
                <StatisticsPane settings={newSettings || settings} />
              </Stack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              w={"45%"}
              colorScheme={"brand"}
              leftIcon={<CheckIcon />}
              onClick={handleOk}
            >
              決定
            </Button>
            <Spacer />
            <Button
              w={"45%"}
              colorScheme={"brand"}
              variant={"outline"}
              leftIcon={<RepeatClockIcon />}
              onClick={handleRetry}
              isDisabled={!newSettings}
            >
              やり直し
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
