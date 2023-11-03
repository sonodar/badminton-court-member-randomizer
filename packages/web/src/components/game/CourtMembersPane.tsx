import {
  Card,
  Center,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import type { CourtMembers, GameMembers } from "@doubles-member-generator/lib";
import { util } from "@doubles-member-generator/lib";
import React from "react";

function CourtCard({
  id,
  members,
  single,
}: {
  id: number;
  members: CourtMembers;
  single?: boolean;
}) {
  const w = single ? "300px" : "150px";
  const s = single ? 12 : 4;

  return (
    <Card p={2} maxW={w} minW={w}>
      <Center>
        <Stack>
          <Center>
            <Heading as={"label"} size={"sm"} color={"gray.600"}>{`コート${
              id + 1
            }`}</Heading>
          </Center>
          <Divider />
          <HStack spacing={s} color={"primary.900"}>
            {members.map((member) => (
              <strong key={member}>{member}</strong>
            ))}
          </HStack>
        </Stack>
      </Center>
    </Card>
  );
}

type Props = {
  members: GameMembers;
  single?: boolean;
};

export default function CourtMembersPane({ members, single = true }: Props) {
  const courtIds = util.array.generate(members.length, 0);
  return (
    <SimpleGrid columns={single ? 1 : 2} spacing={4} justifyItems={"center"}>
      {members.length > 0 &&
        courtIds.map((id) => (
          <CourtCard key={id} id={id} members={members[id]} single={single} />
        ))}
    </SimpleGrid>
  );
}
