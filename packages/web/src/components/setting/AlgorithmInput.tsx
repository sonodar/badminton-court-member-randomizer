import { HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { type Algorithm, Algorithms } from "@doubles-member-generator/manager";
import React from "react";

type Props = { value: Algorithm; onChange: (mode: Algorithm) => void };

export function AlgorithmInput({ value, onChange }: Props) {
  return (
    <RadioGroup onChange={onChange} value={value}>
      <HStack spacing={6}>
        <Radio value={Algorithms.DISCRETENESS} colorScheme={"brand"}>
          ばらつき重視
        </Radio>
        <Radio value={Algorithms.EVENNESS} colorScheme={"brand"}>
          均等性重視
        </Radio>
      </HStack>
    </RadioGroup>
  );
}
