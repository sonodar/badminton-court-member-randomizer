import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
	Button,
	Divider,
	Heading,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { Fragment } from "react";

const Help = {
	algorithm: (
		<Stack spacing={4}>
			<Heading as="span" size="md">
				ばらつき重視
			</Heading>
			<Text>
				なるべく似通った面子にならないようにメンバーを選出します。連続での休憩が発生しますが、何度も繰り返しているうちに平準化されていきます。
			</Text>
			<Heading as="span" size="md">
				均等性重視
			</Heading>
			<Text>
				なるべく均等な回数でコートに入れるようにメンバーを選出します。連続での休憩が発生しづらくなりますが、似通った面子になる傾向が強くなります。
			</Text>
		</Stack>
	),
};

type Props = { title?: string; items: (keyof typeof Help)[] };

export default function HelpButton({ title, items }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Fragment>
			<IconButton
				isRound={true}
				variant="ghost"
				colorScheme="brand"
				aria-label="Help"
				size={"xs"}
				fontSize={"md"}
				icon={<QuestionOutlineIcon />}
				onClick={onOpen}
			/>
			<Modal
				onClose={onClose}
				size={"full"}
				isOpen={isOpen}
				scrollBehavior={"inside"}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Heading as="h3" size="md">
							{title || "ヘルプ"}
						</Heading>
					</ModalHeader>
					<ModalCloseButton />
					<Divider />
					<ModalBody mt={2}>
						{items.map((item) => (
							<Stack key={item} spacing={4}>
								{Help[item]}
							</Stack>
						))}
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>閉じる</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Fragment>
	);
}
