import { SmallCloseIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import ConfirmDialog from "@components/ConfirmDialog.tsx";
import React, { Fragment } from "react";

export function ResetButton({ onReset }: { onReset: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <Button
        size={"sm"}
        colorScheme={"danger"}
        leftIcon={<SmallCloseIcon />}
        onClick={onOpen}
      >
        終了
      </Button>
      <ConfirmDialog
        isOpen={isOpen}
        onCancel={onClose}
        onOk={() => {
          onClose();
          onReset();
        }}
        okColorScheme={"danger"}
        title={"本当に終了しますか？"}
      >
        コート、メンバー、履歴を削除して初期設定に戻ります。
      </ConfirmDialog>
    </Fragment>
  );
}
