import type { Environment, GameMembers } from "@badminton-court-member-randomizer/lib";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { Button, Card, HStack, Spacer, Stack, useDisclosure } from "@chakra-ui/react";
import { CurrentMemberCountInput } from "@components/game/CurrentMemberCountInput.tsx";
import React, { useState } from "react";
import { MdShuffle } from "react-icons/md";
import { SimpleGrid } from "@chakra-ui/react";
import { create } from "@badminton-court-member-randomizer/lib";
import { LeaveDialog } from "@components/game/LeaveDialog.tsx";

type Props = {
    initialSetting: Environment;
};

export default function GamePane({ initialSetting }: Props) {
    const courtCount = initialSetting.courtCount;
    const courtIds = [...Array(courtCount).keys()].map((i) => i);

    const [manager, setManager] = useState(create(initialSetting));
    const { isOpen: isLeaveOpen, onOpen: onLeaveOpen, onClose: onLeaveClose } = useDisclosure();
    const [latestMembers, setLatestMembers] = useState<GameMembers>([]);

    const handleGenerate = () => setLatestMembers(manager.next());
    const handleRetry = () => setLatestMembers(manager.retry());

    return (
        <Stack spacing={6}>
            <CurrentMemberCountInput
                value={manager.memberCount}
                min={courtCount * 4}
                onIncrement={() => setManager(manager.join())}
                onDecrement={onLeaveOpen}
            />
            <LeaveDialog
                members={manager.members}
                isOpen={isLeaveOpen}
                onClose={onLeaveClose}
                onLeave={(id) => setManager(manager.leave(id))}
            />
            <HStack>
                <Button colorScheme={"blue"} leftIcon={<MdShuffle />} onClick={handleGenerate}>
                    払い出し
                </Button>
                <Spacer />
                <Button colorScheme={"red"} leftIcon={<RepeatClockIcon />} size={"xs"} onClick={handleRetry}>
                    やり直し
                </Button>
            </HStack>
            <SimpleGrid columns={2} spacing={6}>
                {latestMembers.length > 0 &&
                    courtIds.map((id) => (
                        <Card key={id} minW={"50%"} p={2}>
                            コート {id + 1}
                            <hr />
                            <HStack spacing={6}>
                                {latestMembers[id].map((member) => (
                                    <span key={member}>{member}</span>
                                ))}
                            </HStack>
                        </Card>
                    ))}
            </SimpleGrid>
        </Stack>
    );
}
