import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { useSettings } from "@components/state";

export default function MemberCountPane() {
  const { members, gameCounts } = useSettings();
  const memberIds = new Set(members.map((member) => member.toString()));
  return (
    <SimpleGrid minChildWidth="110px" spacing={2}>
      {Object.entries(gameCounts).map(([id, { playCount }]) => (
        <Box
          key={id}
          bg={memberIds.has(id) ? "" : "gray"}
          color={memberIds.has(id) ? "" : "white"}
          p={2}
        >
          <Center>
            <HStack spacing={3}>
              <Heading as={"label"} size={"md"}>{`${id} :`}</Heading>
              <span>{playCount} 回</span>
            </HStack>
          </Center>
          {memberIds.has(id) && <Divider />}
        </Box>
      ))}
    </SimpleGrid>
  );
}
