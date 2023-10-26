import { Card, HStack, SimpleGrid } from "@chakra-ui/react";
import type { CourtMembers, GameMembers } from "@doubles-member-generator/lib";
import React from "react";

function CourtCard({
    id,
    members,
}: {
    id: number;
    members: CourtMembers;
}) {
    return (
        <Card minW={"50%"} p={2}>
            コート {id + 1}
            <hr />
            <HStack spacing={6}>
                {members.map((member) => (
                    <span key={member}>{member}</span>
                ))}
            </HStack>
        </Card>
    );
}

type Props = {
    members: GameMembers;
    courtIds: number[];
};

export default function CourtMembersPane({ members, courtIds }: Props) {
    return (
        <SimpleGrid columns={2} spacing={6}>
            {members.length > 0 && courtIds.map((id) => <CourtCard key={id} id={id} members={members[id]} />)}
        </SimpleGrid>
    );
}
