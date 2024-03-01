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
import { CheckIcon, RepeatClockIcon } from "@chakra-ui/icons";
import { UsageAlertDialog } from "./UsageAlertDialog";
import { type CurrentSettings } from "@logic";
import { generate, retry, isRecent } from "@logic";
import { StatisticsPane } from "@components/game/StatisticsPane.tsx";

type Props = {
  settings: CurrentSettings;
  onGenerate: (settings: CurrentSettings) => void;
  onIgnoreUsageAlert: () => void;
  isDisabled?: boolean;
};

export function GenerateButton({
  settings,
  onGenerate,
  isDisabled,
  onIgnoreUsageAlert,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const [newSettings, setNewSettings] = useState<CurrentSettings | undefined>();

  const openGeneratePane = () => {
    setNewSettings(generate(settings));
    onOpen();
  };

  const handleClick = () => {
    if (settings.ignoreUsageAlert || !isRecent(settings)) {
      return openGeneratePane();
    }
    onAlertOpen();
  };

  const handleOk = () => {
    onGenerate(newSettings || settings);
    onClose();
  };

  const handleAdjust = (settings: CurrentSettings) => {
    setNewSettings(settings);
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
      <UsageAlertDialog
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onDismiss={onIgnoreUsageAlert}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
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
              <StatisticsPane
                settings={newSettings || settings}
                onAdjusted={handleAdjust}
              />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              w={"45%"}
              colorScheme={"primary"}
              leftIcon={<CheckIcon />}
              onClick={handleOk}
            >
              確定
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
