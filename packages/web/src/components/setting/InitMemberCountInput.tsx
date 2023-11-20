import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input, Text } from "@chakra-ui/react";
import { MEMBER_COUNT_LIMIT } from "@doubles-member-generator/manager";
import React from "react";

type Props = {
  min: number;
  value: number;
  onChange: (i: number) => void;
};

export function InitMemberCountInput({ min, value, onChange }: Props) {
  return (
    <HStack maxW={"320px"} minW={"320px"}>
      <IconButton
        colorScheme={"brand"}
        aria-label="decrement"
        borderRadius="sm"
        isDisabled={value <= min}
        icon={<MinusIcon />}
        size={"sm"}
        onClick={() => value > min && onChange(value - 1)}
      />
      <Input
        type={"number"}
        value={value}
        step={1}
        min={min}
        max={MEMBER_COUNT_LIMIT}
        style={{ textAlign: "center" }}
        width={"20"}
        size={"sm"}
        fontSize={"md"}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
      <IconButton
        colorScheme={"brand"}
        aria-label="increment"
        borderRadius="sm"
        isDisabled={value >= MEMBER_COUNT_LIMIT}
        icon={<AddIcon />}
        size={"sm"}
        onClick={() => value < MEMBER_COUNT_LIMIT && onChange(value + 1)}
      />
      <Text fontSize="md">(上限 {MEMBER_COUNT_LIMIT} 人)</Text>
    </HStack>
  );
}
