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
} from "@chakra-ui/react";
import { match } from "ts-pattern";
import { Algorithms, type Algorithm } from "@logic";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDismiss: () => void;
  algorithm: Algorithm;
};

export function UsageAlertDialog({
  isOpen,
  onClose,
  onDismiss,
  algorithm,
}: Props) {
  const message = match(algorithm)
    .with(
      Algorithms.DISCRETENESS,
      () =>
        "ばらつき重視の場合、連続で試合に入れないメンバーが出てくる可能性が高くなります。",
    )
    .with(
      Algorithms.EVENNESS,
      () =>
        "均等性重視で、かつコートに入れない余剰メンバーの数が 5 人以上の場合、連続で試合に入れないメンバーが出てくる可能性があります。",
    )
    .exhaustive();

  const handleOk = () => {
    onClose();
  };

  const handleDismiss = () => {
    onDismiss();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent maxW={"350px"}>
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
            <Text fontSize={"lg"} color={"red.500"}>
              プレイ回数の公平性が保証できなくなるため、連続での組み合わせ決定はやらないことを強くお勧めします。
            </Text>
            <Text>{message}</Text>
            <Text>
              もしどうしても連続で組み合わせを決定したい場合は、他のアプリの利用を検討してください。
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack w={"100%"} gap={10}>
            <Button colorScheme="primary" size={"lg"} onClick={handleOk}>
              組み合わせ決定をやめる
            </Button>
            <Button
              size={"lg"}
              fontSize={"xs"}
              variant={"outline"}
              color={"gray.400"}
              onClick={handleDismiss}
            >
              はい、私はこのアプリの「テスト目的のため」
              <br />
              連続での組み合わせ決定を行っています。
              <br />
              次からこの警告を表示しません。
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
