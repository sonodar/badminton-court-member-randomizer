import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import React, { type ReactNode, type RefObject } from "react";

type Props = {
    isOpen: boolean;
    onCancel: () => void;
    onOk: () => void;
    cancelRef: RefObject<unknown>;
    title: string;
    children: ReactNode;
    okButtonText?: string;
    okColorScheme?: string;
    cancelButtonText?: string;
};

export default function ConfirmDialog({
    isOpen,
    onCancel,
    onOk,
    cancelRef,
    title,
    children,
    cancelButtonText = "キャンセル",
    okButtonText = "OK",
    okColorScheme = "red",
}: Props) {
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCancel}>
            <AlertDialogOverlay>
                <AlertDialogContent maxW={"xs"}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>{children}</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCancel}>
                            {cancelButtonText}
                        </Button>
                        <Button colorScheme={okColorScheme} onClick={onOk} ml={3}>
                            {okButtonText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}
