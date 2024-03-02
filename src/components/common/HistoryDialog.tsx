import {
	Center,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import HistoryPane from "./HistoryPane.tsx";
import { prettyFont } from "@components/theme.ts";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

export function HistoryDialog({ isOpen, onClose }: Props) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
			<ModalOverlay />
			<ModalContent maxW={"350px"}>
				<ModalHeader maxH={"xs"} style={{ ...prettyFont }}>
					履歴
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody py={4} px={0}>
					<Center>
						<HistoryPane />
					</Center>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
