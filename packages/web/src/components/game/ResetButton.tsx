import { Button, useDisclosure } from "@chakra-ui/react";
import ConfirmDialog from "@components/ConfirmDialog.tsx";
import React, { Fragment, useRef } from "react";
import { MdClose } from "react-icons/md";

export function ResetButton({ onReset }: { onReset: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    return (
        <Fragment>
            <Button size={"sm"} colorScheme={"red"} leftIcon={<MdClose />} onClick={onOpen}>
                終了
            </Button>
            <ConfirmDialog
                isOpen={isOpen}
                onCancel={onClose}
                onOk={() => {
                    onClose();
                    onReset();
                }}
                cancelRef={cancelRef}
                title={"本当に終了しますか？"}
            >
                コート、メンバー、履歴を削除して初期設定に戻ります。
            </ConfirmDialog>
        </Fragment>
    );
}
