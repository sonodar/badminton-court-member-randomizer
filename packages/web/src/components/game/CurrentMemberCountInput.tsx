import { Button, HStack, Input, Spacer } from "@chakra-ui/react";
import { MEMBER_COUNT_LIMIT } from "@doubles-member-generator/lib";
import React from "react";
import { TbUserOff, TbUserPlus } from "react-icons/tb";

type Props = {
    min: number;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

export function CurrentMemberCountInput({ min, value, onIncrement, onDecrement }: Props) {
    return (
        <HStack maxW="320px">
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
                colorScheme={"teal"}
                onClick={onIncrement}
                isDisabled={value >= MEMBER_COUNT_LIMIT}
            >
                参加
            </Button>
            <Button
                leftIcon={<TbUserOff />}
                size={"sm"}
                colorScheme={"orange"}
                onClick={onDecrement}
                isDisabled={value <= min}
            >
                離脱
            </Button>
        </HStack>
    );
}
