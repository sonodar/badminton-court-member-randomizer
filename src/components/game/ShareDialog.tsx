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
	Spacer,
	Heading,
} from "@chakra-ui/react";
import { useRef } from "react";
import LineShareButton from "@components/common/LineShareButton.tsx";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	value?: string;
};

export function ShareDialog({ isOpen, onClose, value }: Props) {
	const toast = useToast();
	const toastRef = useRef<string | number>();

	const handleCopy = () => {
		if (value) {
			navigator.clipboard.writeText(value);
			toastRef.current = toast({
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
				<ModalHeader maxH={"xs"}>
					<Heading as={"label"} size={"md"}>
						共有
					</Heading>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={4}>
					<Center>
						<Stack w={"100%"}>
							<Input px={1} value={value} isReadOnly={true} />
							<Center>
								<LineShareButton url={value} />
								<Spacer />
								<Button size={"sm"} w={"8rem"} leftIcon={<CopyIcon />} onClick={handleCopy}>
									URLコピー
								</Button>
							</Center>
						</Stack>
					</Center>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
