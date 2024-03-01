import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Fragment } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { HistoryDialog } from "@components/common/HistoryDialog.tsx";
import { useSettings } from "@components/state";

export function HistoryButton({ isDisabled }: { isDisabled?: boolean }) {
	const { histories } = useSettings();
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Fragment>
			<IconButton
				variant={"ghost"}
				colorScheme={"brand"}
				fontSize={"2xl"}
				aria-label="履歴"
				icon={<MdOutlineWatchLater />}
				isDisabled={isDisabled || histories.length === 0}
				onClick={onOpen}
			/>
			<HistoryDialog isOpen={isOpen} onClose={onClose} />
		</Fragment>
	);
}
