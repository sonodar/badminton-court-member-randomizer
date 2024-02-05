import {
  Card,
  Center,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import type { CourtMembers, GameMembers } from "@logic";
import { array } from "@logic";

type ParentProps = {
  members: GameMembers;
  single?: boolean;
  archive?: boolean;
};

export default function CourtMembersPane({
  members,
  single = true,
  archive = false,
}: ParentProps) {
  const courtIds = array.generate(members.length, 0);
  return (
    <SimpleGrid columns={single ? 1 : 2} spacing={4} justifyItems={"center"}>
      {members.length > 0 &&
        courtIds.map((id) => (
          <CourtCard
            key={id}
            id={id}
            members={members[id]}
            single={single}
            archive={archive}
          />
        ))}
    </SimpleGrid>
  );
}

type ChildProps = {
  id: number;
  members: CourtMembers;
  single: boolean;
  archive?: boolean;
};

function CourtCard({ id, members, single, archive }: ChildProps) {
  const w = single ? "300px" : "150px";
  const s = single ? 12 : 4;
  const headColor = archive ? "gray.500" : "gray.600";
  const color = archive ? "gray.500" : "primary.900";

  return (
    <Card p={2} maxW={w} minW={w}>
      <Center>
        <Stack>
          <Center>
            <Heading as={"label"} size={"sm"} color={headColor}>{`コート${
              id + 1
            }`}</Heading>
          </Center>
          <Divider />
          <HStack spacing={s} color={color}>
            {members.map((member) => (
              <strong key={member}>{member}</strong>
            ))}
          </HStack>
        </Stack>
      </Center>
    </Card>
  );
}
