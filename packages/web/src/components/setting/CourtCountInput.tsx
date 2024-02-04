import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { array, COURT_COUNT_LIMIT } from "@doubles-member-generator/manager";
import React from "react";
import type { UseRadioProps } from "@chakra-ui/radio";

type Props = {
  value: number;
  onChange: (i: number) => void;
};

const COURT_IDS = array.generate(COURT_COUNT_LIMIT).map(String);

export function CourtCountInput({ value, onChange }: Props) {
  function CourtCountButton(props: UseRadioProps) {
    const { getInputProps, getRadioProps } = useRadio(props);

    return (
      <Box as="label" cursor="pointer">
        <input {...getInputProps()} hidden />
        <Box
          {...getRadioProps()}
          borderWidth="1px"
          borderRadius="sm"
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
          px={4}
          py={2}
        >
          {props.value}
        </Box>
      </Box>
    );
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "courtCount",
    value: value.toString(),
    onChange: (e) => onChange(parseInt(e, 10)),
  });

  return (
    <HStack {...getRootProps()}>
      {COURT_IDS.map((courtId) => (
        <CourtCountButton
          key={courtId}
          {...getRadioProps({ value: courtId })}
        />
      ))}
    </HStack>
  );
}
