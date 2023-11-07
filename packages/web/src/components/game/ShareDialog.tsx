import { CopyIcon } from "@chakra-ui/icons";
import {
  Center,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { prittyFont } from "@components/theme";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  value?: string;
};

export function ShareDialog({ isOpen, onClose, value }: Props) {
  const toast = useToast();

  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      toast({
        title: "コピーしました",
        status: "info",
        duration: 2000,
        isClosable: true,
        colorScheme: "brand",
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent maxW={"350px"}>
        <ModalHeader maxH={"xs"} style={{ ...prittyFont }}>
          共有
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <Center>
            <Stack w={"100%"}>
              <Input px={1} value={value} isReadOnly={true} />
              <Center>
                <Button
                  size={"sm"}
                  w={"8rem"}
                  leftIcon={<CopyIcon />}
                  onClick={handleCopy}
                >
                  コピー
                </Button>
              </Center>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
