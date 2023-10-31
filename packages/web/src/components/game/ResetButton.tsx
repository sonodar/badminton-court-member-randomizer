import { Button, useDisclosure } from "@chakra-ui/react";
import ConfirmDialog from "@components/ConfirmDialog.tsx";
import React, { Fragment, useRef } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

export function ResetButton({ onReset }: { onReset: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement | null>(null);
    return (
        <Fragment>
            <Button size={"sm"} colorScheme={"red"} leftIcon={<MdOutlineDeleteOutline />} onClick={onOpen}>
                削除
            </Button>
            <ConfirmDialog
                isOpen={isOpen}
                onCancel={onClose}
                onOk={() => {
                    onClose();
                    onReset();
                }}
                cancelRef={cancelRef}
                title={"初期化の確認"}
            >
                設定および履歴を削除して最初からやり直します。本当によろしいですか？
            </ConfirmDialog>
        </Fragment>
    );
}
