import { SmallCloseIcon } from "@chakra-ui/icons";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import React, { Fragment } from "react";
import ConfirmDialog from "@components/ConfirmDialog.tsx";

export function ResetButton({ onReset }: { onReset: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <IconButton
        colorScheme={"danger"}
        size={"sm"}
        mt={1}
        fontSize={"lg"}
        aria-label="メンバー"
        icon={<SmallCloseIcon />}
        onClick={onOpen}
      />
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
