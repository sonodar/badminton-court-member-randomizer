import { Button, HStack, Input, Spacer, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { TbUserOff, TbUserPlus } from "react-icons/tb";
import { COURT_CAPACITY, MEMBER_COUNT_LIMIT } from "@logic";
import { LeaveDialog } from "@components/game/LeaveDialog";
import { useSettings } from "@components/state";

type Props = {
  onIncrement: () => void;
  onDecrement: (id: number) => void;
  isDisabled?: boolean;
};

export function CurrentMemberCountInput({
  onIncrement,
  onDecrement,
  isDisabled,
}: Props) {
  const { members, courtCount } = useSettings();
  const min = courtCount * COURT_CAPACITY;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack maxW={"320px"} minW={"320px"}>
      <span>現在</span>
      <Input
        type={"number"}
        value={members.length}
        step={1}
        min={min}
        max={MEMBER_COUNT_LIMIT}
        style={{ textAlign: "center" }}
        width={"14"}
        border={""}
        readOnly
      />
      <span>人</span>
      <Spacer />
      <Button
        leftIcon={<TbUserPlus />}
        size={"sm"}
        colorScheme={"brand"}
        variant={"solid"}
        onClick={onIncrement}
        isDisabled={isDisabled || members.length >= MEMBER_COUNT_LIMIT}
      >
        参加
      </Button>
      <Button
        leftIcon={<TbUserOff />}
        size={"sm"}
        variant={"outline"}
        colorScheme={"brand"}
        onClick={onOpen}
        isDisabled={isDisabled || members.length <= min}
      >
        離脱
      </Button>
      <LeaveDialog
        members={members}
        isOpen={isOpen}
        onClose={onClose}
        onLeave={onDecrement}
      />
    </HStack>
  );
}
