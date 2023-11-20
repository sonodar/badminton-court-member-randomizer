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

  function CountPain({ id, playCount }: { id: number; playCount?: number }) {
    const restCount = restCounts.find((c) => c.id === id)?.count || 0;

    return (
      <Box
        bg={members.includes(id) ? "" : "gray"}
        color={members.includes(id) ? "" : "white"}
        p={2}
      >
        <Center>
          <HStack spacing={3}>
            <Heading
              as={"label"}
              size={small ? "sm" : "md"}
            >{`${id} :`}</Heading>
            <Text fontSize={small ? "sm" : "md"}>
              {playCount || 0} 回 ({restCount})
            </Text>
          </HStack>
        </Center>
        {members.includes(id) && <Divider />}
      </Box>
    );
  }

  return (
    <SimpleGrid minChildWidth="110px" spacing={2} color={"gray.600"}>
      {memberIds.map((id) => (
        <CountPain key={id} id={id} playCount={gameCounts[id]?.playCount} />
      ))}
    </SimpleGrid>
  );
}
