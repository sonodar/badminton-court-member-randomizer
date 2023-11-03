import { Button, useDisclosure } from "@chakra-ui/react";
import type { CurrentSettings } from "@doubles-member-generator/lib";
import React, { Fragment } from "react";
import { TbUsers } from "react-icons/tb";
import { MemberDialog } from "@components/game/MemberDialog.tsx";

export function MemberButton(settings: CurrentSettings) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <Button
        w={"100px"}
        size={"sm"}
        leftIcon={<TbUsers />}
        isDisabled={settings.histories.length === 0}
        onClick={onOpen}
      >
        メンバー
      </Button>
      <MemberDialog {...settings} isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
}
