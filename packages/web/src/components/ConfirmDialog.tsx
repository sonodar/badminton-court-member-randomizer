import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import React, { useRef, type ReactNode } from "react";
import { prittyFont } from "./theme";

type Props = {
    isOpen: boolean;
    onCancel: () => void;
    onOk: () => void;
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
    title,
    children,
    cancelButtonText = "キャンセル",
    okButtonText = "OK",
    okColorScheme = "brand",
}: Props) {
    const cancel = useRef<HTMLButtonElement | null>(null);
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancel} onClose={onCancel}>
            <AlertDialogOverlay>
                <AlertDialogContent maxW={"350px"}>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold" {...prittyFont}>
                        {title}
                    </AlertDialogHeader>
                    <AlertDialogBody>{children}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancel} onClick={onCancel} variant={"outline"}>
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
