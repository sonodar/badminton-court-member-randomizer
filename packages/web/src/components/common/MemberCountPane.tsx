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
  getLatestMembers,
  getContinuousRestCounts,
  getRestMembers,
  type CurrentSettings,
  array,
} from "@doubles-member-generator/manager";
import { useSettings } from "@components/state";

type Props = {
  settings?: CurrentSettings;
  small?: boolean;
  showLeftMember?: boolean;
};

function detectColor(restCount: number) {
  if (restCount >= 3) {
    return "red.200";
  }
  if (restCount === 2) {
    return "orange.200";
  }
  if (restCount === 1) {
    return "yellow.100";
  }
  return "";
}

export default function MemberCountPane({
  small,
  settings,
  showLeftMember,
}: Props) {
  const { histories, members, gameCounts } = settings || useSettings();
  const playMemberIds = Object.keys(gameCounts).map(Number);
  const memberIds = array.sort(
    array.unique(members.concat(showLeftMember ? playMemberIds : [])),
  );

  const lastMembers = getLatestMembers({ histories });
  const restMembers = lastMembers
    ? getRestMembers({ members }, lastMembers)
    : [];
  const restCounts = getContinuousRestCounts(histories, restMembers);

  function CountPain({
    id,
    playCount = 0,
  }: {
    id: number;
    playCount?: number;
  }) {
    const restCount = restCounts.find((c) => c.id === id)?.count || 0;

    const color = !members.includes(id) ? "gray" : detectColor(restCount);

    return (
      <Box bg={color} color={members.includes(id) ? "" : "white"}>
        <Center>
          <HStack spacing={3}>
            <Heading
              as={"label"}
              size={small ? "sm" : "md"}
            >{`${id} :`}</Heading>
            <Text fontSize={small ? "sm" : "md"}>
              {playCount} 回 ({restCount})
            </Text>
          </HStack>
        </Center>
        {members.includes(id) && <Divider />}
      </Box>
    );
  }

  return (
    <SimpleGrid minChildWidth="110px" spacing={0} color={"gray.600"}>
      {memberIds.map((id) => (
        <CountPain key={id} id={id} playCount={gameCounts[id]?.playCount} />
      ))}
    </SimpleGrid>
  );
}
