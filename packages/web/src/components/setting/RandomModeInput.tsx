import {
  Card,
  CardBody,
  HStack,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import type { RandomMode } from "@doubles-member-generator/manager";
import React from "react";

type Props = { value: RandomMode; onChange: (mode: RandomMode) => void };

const descriptions: Record<RandomMode, string> = {
  DISCRETENESS:
    "なるべく似通った面子にならないようにメンバーを選出します。連続での休憩が発生しやすいですが、何度も繰り返しているうちに平準化されていきます。",
  EVENNESS:
    "なるべく均等な回数でコートに入れるようにメンバーを選出します。連続で休憩が発生しづらくなりますが、似通った面子になる傾向が強くなります。",
};

export default function RandomModeInput({ value, onChange }: Props) {
  return (
    <Stack>
      <RadioGroup onChange={onChange} value={value}>
        <HStack spacing={6}>
          <Radio value={"DISCRETENESS"} colorScheme={"brand"}>
            ばらつき重視
          </Radio>
          <Radio value={"EVENNESS"} colorScheme={"brand"}>
            均等性重視
          </Radio>
        </HStack>
      </RadioGroup>
      <Card fontSize={"sm"} minH={"8rem"}>
        <CardBody>{descriptions[value]}</CardBody>
      </Card>
    </Stack>
  );
}
