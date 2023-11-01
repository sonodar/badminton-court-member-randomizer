import { Button, HStack, Input, Spacer, useDisclosure } from "@chakra-ui/react";
import { LeaveDialog } from "@components/game/LeaveDialog.tsx";
import { MEMBER_COUNT_LIMIT } from "@doubles-member-generator/lib";
import React from "react";
import { TbUserOff, TbUserPlus } from "react-icons/tb";

type Props = {
    members: number[];
    min: number;
    value: number;
    onIncrement: () => void;
    onDecrement: (id: number) => void;
};

export function CurrentMemberCountInput({ members, min, value, onIncrement, onDecrement }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HStack maxW={"320px"} minW={"320px"}>
            <span>現在</span>
            <Input
                type={"number"}
                value={value}
                step={1}
                min={min}
                max={MEMBER_COUNT_LIMIT}
                style={{ textAlign: "center" }}
                width={"14"}
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
                isDisabled={value >= MEMBER_COUNT_LIMIT}
            >
                参加
            </Button>
            <Button
                leftIcon={<TbUserOff />}
                size={"sm"}
                variant={"outline"}
                colorScheme={"brand"}
                onClick={onOpen}
                isDisabled={value <= min}
            >
                離脱
            </Button>
            <LeaveDialog members={members} isOpen={isOpen} onClose={onClose} onLeave={onDecrement} />
        </HStack>
    );
}
