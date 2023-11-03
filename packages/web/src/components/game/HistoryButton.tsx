import { Button, useDisclosure } from "@chakra-ui/react";
import type { CurrentSettings } from "@doubles-member-generator/lib";
import React, { Fragment } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { HistoryDialog } from "@components/game/HistoryDialog.tsx";

export function HistoryButton(settings: CurrentSettings) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <Button
        w={"90px"}
        size={"sm"}
        leftIcon={<MdOutlineWatchLater />}
        isDisabled={settings.histories.length === 0}
        onClick={onOpen}
      >
        履歴
      </Button>
      <HistoryDialog {...settings} isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
}
