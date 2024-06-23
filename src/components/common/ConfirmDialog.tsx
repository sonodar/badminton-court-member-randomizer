import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from "@chakra-ui/react";
import { useRef, type ReactNode } from "react";
import { prettyFont } from "../theme.ts";

type Props = {
	isOpen: boolean;
	onCancel: () => void;
	onOk: () => void;
	title: string;
	children: ReactNode;
	okButtonText?: string;
	okColorScheme?: string;
	cancelButtonText?: string;
} & Record<string, unknown>;

export default function ConfirmDialog({
	isOpen,
	onCancel,
	onOk,
	title,
	children,
	cancelButtonText = "キャンセル",
	okButtonText = "OK",
	okColorScheme = "brand",
	...attrs
}: Props) {
	const cancel = useRef<HTMLButtonElement | null>(null);
	return (
		<AlertDialog isOpen={isOpen} leastDestructiveRef={cancel} onClose={onCancel}>
			<AlertDialogOverlay>
				<AlertDialogContent maxW={"350px"}>
					<AlertDialogHeader fontSize="lg" fontWeight="bold" {...prettyFont}>
						{title}
					</AlertDialogHeader>
					<AlertDialogBody {...attrs}>{children}</AlertDialogBody>
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
