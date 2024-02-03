import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  type CurrentSettings,
  array,
  type MemberCountVariant,
  OutlierLevelProvider,
} from "@doubles-member-generator/manager";
import { useSettings } from "@components/state";

type Props = {
  settings?: CurrentSettings;
  small?: boolean;
  showLeftMember?: boolean;
  variant: MemberCountVariant;
};

const outlierLevelColors = {
  none: "",
  low: "yellow.100",
  medium: "orange.200",
  high: "red.200",
} as const;

export default function MemberCountPane({
  small,
  settings,
  showLeftMember,
  variant,
}: Props) {
  const { histories, members, gameCounts } = settings || useSettings();
  const playMemberIds = Object.keys(gameCounts).map(Number);
  const memberIds = array.sort(
    array.unique(members.concat(showLeftMember ? playMemberIds : [])),
  );

  const { getLevel, getValue } = OutlierLevelProvider({
    histories,
    members,
    gameCounts,
  });

  function CountPain({
    id,
    variant,
  }: {
    id: number;
    playCount?: number;
    variant: MemberCountVariant;
  }) {
    const value = getValue(variant, id);
    const level = getLevel(variant, id);
    const color = !members.includes(id) ? "gray" : outlierLevelColors[level];
    const size = small ? "sm" : "md";

    return (
      <Box bg={color} color={members.includes(id) ? "" : "white"}>
        <Center>
          <HStack spacing={3}>
            <Heading as={"label"} size={size}>{`${id} :`}</Heading>
            <Text fontSize={size}>{value} 回</Text>
          </HStack>
        </Center>
        {members.includes(id) && <Divider />}
      </Box>
    );
  }

  return (
    <SimpleGrid minChildWidth="110px" spacing={0} color={"gray.600"}>
      {memberIds.map((id) => (
        <CountPain key={id} id={id} variant={variant} />
      ))}
    </SimpleGrid>
  );
}
