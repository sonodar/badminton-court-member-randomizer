import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Stack,
  Button,
  Text,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertTitle,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Algorithms, type Algorithm, isUnfair } from "@logic";
import { useSettings } from "@components/state";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDismiss: () => void;
};

const unfairMessages: Record<Algorithm, string> = {
  [Algorithms.DISCRETENESS]:
    "ばらつき重視の場合、連続で試合に入れないメンバーが出てくる可能性が高くなります。",
  [Algorithms.EVENNESS]:
    "均等性重視で、かつコートに入れない余剰メンバーの数が 5 人以上の場合、連続で試合に入れないメンバーが出てくる可能性があります。",
};

const link = `https://www.google.com/search?q=${encodeURIComponent("ダブルス 組み合わせ アプリ")}`;

export function UsageAlertDialog({ isOpen, onClose, onDismiss }: Props) {
  const settings = useSettings();
  const unfair = isUnfair(settings);
  const unfairMessage = unfairMessages[settings.algorithm];

  const handleOk = () => {
    onClose();
  };

  const handleDismiss = () => {
    onDismiss();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"full"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader maxH={"xs"} p={0}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle color={"red.800"}>不適切な使い方です</AlertTitle>
          </Alert>
        </ModalHeader>
        <ModalBody pb={4}>
          <Stack w={"100%"}>
            <Text>
              前回の組み合わせを決定してからほとんど時間が経過していません。試合が終わる前に連続で組み合わせを決定しようとしていませんか？
            </Text>
            <Text>連続で試合を決定すると途中参加や途中離脱ができません。</Text>
            {unfair && (
              <Text fontSize={"lg"} color={"red.500"}>
                さらに、プレイ回数の公平性が保証できなくなるため、連続での組み合わせ決定はやらないことを強くお勧めします。
              </Text>
            )}
            {unfair && <Text>{unfairMessage}</Text>}
            <Text>
              もしどうしても連続で組み合わせを決定したい場合は、他のアプリの利用を検討してください。
            </Text>
            <Link href={link} isExternal>
              検索 <ChevronRightIcon mx="2px" /> ダブルス 組み合わせ アプリ{" "}
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack w={"100%"} gap={10}>
            <Button colorScheme="primary" size={"lg"} onClick={handleOk}>
              組み合わせ決定をやめる
            </Button>
            <Button
              size={"xs"}
              fontSize={"xs"}
              variant={"ghost"}
              color={"gray.300"}
              onClick={handleDismiss}
            >
              テスト目的のためリスクを許容します
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
