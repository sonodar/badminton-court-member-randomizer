import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import React from "react";

type Props = {
    min: number;
    value: number;
    onChange: (i: number) => void | Promise<void>;
};

export function InitMemberCountInput({ min, value, onChange }: Props) {
    return (
        <HStack maxW="320px">
            <IconButton
                colorScheme={"red"}
                aria-label="decrement"
                isDisabled={value <= min}
                icon={<MinusIcon />}
                onClick={() => value > min && onChange(value - 1)}
            />
            <Input
                type={"number"}
                value={value}
                step={1}
                min={min}
                max={40}
                style={{ textAlign: "center" }}
                width={"20"}
                onChange={(e) => onChange(parseInt(e.target.value))}
            />
            <IconButton
                colorScheme={"blue"}
                aria-label="increment"
                isDisabled={value >= 40}
                icon={<AddIcon />}
                onClick={() => value < 40 && onChange(value + 1)}
            />
            <span>(上限 40 人)</span>
        </HStack>
    );
}
