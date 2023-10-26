import { Box, Center, Divider, HStack, SimpleGrid } from "@chakra-ui/react";
import type { PlayCountPerMember } from "@doubles-member-generator/lib";
import React from "react";

type Props = {
    members: number[];
    gameCounts: PlayCountPerMember;
};

export default function MemberCountPane({ members, gameCounts }: Props) {
    const memberIds = new Set(members.map((member) => member.toString()));
    return (
        <SimpleGrid minChildWidth="110px" spacing={2}>
            {Object.entries(gameCounts).map(([id, count]) => (
                <Box key={id} bg={memberIds.has(id) ? "" : "gray"} color={memberIds.has(id) ? "" : "white"} p={2}>
                    <Center>
                        <HStack spacing={3}>
                            <strong>{id}番</strong>
                            <span>{count} 回</span>
                        </HStack>
                    </Center>
                    {memberIds.has(id) && <Divider />}
                </Box>
            ))}
        </SimpleGrid>
    );
}
