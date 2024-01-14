import { HStack, Radio, RadioGroup } from "@chakra-ui/react";
import type { Algorithm } from "@doubles-member-generator/manager";
import React from "react";

type Props = { value: Algorithm; onChange: (mode: Algorithm) => void };

export default function AlgorithmInput({ value, onChange }: Props) {
  // ばらつき重視にバグが見つかったので、一旦無効化
  return (
    <RadioGroup onChange={onChange} value={value} isDisabled={true}>
      <HStack spacing={6}>
      <Radio value={"EVENNESS"} colorScheme={"brand"}>
          均等性重視
        </Radio>
        <Radio value={"DISCRETENESS"} colorScheme={"brand"}>
          ばらつき重視
        </Radio>
      </HStack>
    </RadioGroup>
  );
}
