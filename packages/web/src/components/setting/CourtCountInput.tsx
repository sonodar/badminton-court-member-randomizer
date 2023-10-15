import { Box, HStack, Stack, useRadio, useRadioGroup } from "@chakra-ui/react";
import React from "react";

function CourtCountButton(props: Parameters<typeof useRadio>[0] & { children: React.ReactNode }) {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: "orange.400",
                    color: "white",
                    borderColor: "orange.400",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    );
}

type Props = {
    value: number;
    onChange: (i: number) => void | Promise<void>;
};

export function CourtCountInput({ value, onChange }: Props) {
    const numbers = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "courtCount",
        defaultValue: value.toString(),
        onChange: (e) => onChange(parseInt(e, 10)),
    });

    return (
        <Stack>
            <HStack {...getRootProps()}>
                {numbers.slice(0, 4).map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                        <CourtCountButton key={value} {...radio}>
                            {value}
                        </CourtCountButton>
                    );
                })}
            </HStack>
            <HStack {...getRootProps()}>
                {numbers.slice(4, 8).map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                        <CourtCountButton key={value} {...radio}>
                            {value}
                        </CourtCountButton>
                    );
                })}
            </HStack>
        </Stack>
    );
}
