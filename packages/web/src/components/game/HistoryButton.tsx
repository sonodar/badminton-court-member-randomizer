import { IconButton, useDisclosure } from "@chakra-ui/react";
import type { CurrentSettings } from "@doubles-member-generator/manager";
import React, { Fragment } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { HistoryDialog } from "@components/game/HistoryDialog";

export function HistoryButton({
  isDisabled,
  ...settings
}: CurrentSettings & { isDisabled?: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <IconButton
        variant={"ghost"}
        colorScheme={"brand"}
        fontSize={"2xl"}
        aria-label="履歴"
        icon={<MdOutlineWatchLater />}
        isDisabled={isDisabled || settings.histories.length === 0}
        onClick={onOpen}
      />
      <HistoryDialog {...settings} isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
}
