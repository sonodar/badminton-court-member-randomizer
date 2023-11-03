import { Box, HStack, Stack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { COURT_COUNT_LIMIT } from "@doubles-member-generator/lib";
import React from "react";

function CourtCountButton(
  props: Parameters<typeof useRadio>[0] & { children: React.ReactNode },
) {
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
        sx={{ "--chakra-shadows-outline": "0" }}
        _checked={{
          bg: "brand.500",
          color: "white",
          borderColor: "brand.500",
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
  onChange: (i: number) => void;
};

export function CourtCountInput({ value, onChange }: Props) {
  const numbers = Array.from(
    { length: COURT_COUNT_LIMIT },
    (_, i) => `${i + 1}`,
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "courtCount",
    defaultValue: value.toString(),
    onChange: (e) => onChange(parseInt(e, 10)),
  });

  return (
    <Stack>
      <HStack {...getRootProps()}>
        {numbers.map((value) => {
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
