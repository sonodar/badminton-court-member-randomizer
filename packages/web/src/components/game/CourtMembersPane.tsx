import { Card, CardBody, CardFooter, CardHeader, Center, Divider, HStack, SimpleGrid, Stack } from "@chakra-ui/react";
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
        <Card p={2}>
            <Center>
                <Stack>
                    <Center>コート {id + 1}</Center>
                    <Divider />
                    <HStack spacing={6}>
                        {members.map((member) => (
                            <span key={member}>{member}</span>
                        ))}
                    </HStack>
                </Stack>
            </Center>
        </Card>
    );
}

type Props = {
    members: GameMembers;
    courtIds: number[];
};

export default function CourtMembersPane({ members, courtIds }: Props) {
    return (
        <SimpleGrid columns={2} spacing={2}>
            {members.length > 0 && courtIds.map((id) => <CourtCard key={id} id={id} members={members[id]} />)}
        </SimpleGrid>
    );
}
