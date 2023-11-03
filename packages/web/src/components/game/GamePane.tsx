import { RepeatClockIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  HStack,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import type {
  CurrentSettings,
  GameMembers,
} from "@doubles-member-generator/lib";
import { create } from "@doubles-member-generator/lib";
import React, { useState } from "react";
import { IoDiceOutline } from "react-icons/io5";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import { CurrentMemberCountInput } from "@components/game/CurrentMemberCountInput.tsx";
import { HistoryButton } from "@components/game/HistoryButton.tsx";
import { MemberButton } from "@components/game/MemberButton.tsx";
import { ResetButton } from "@components/game/ResetButton.tsx";

type Props = {
  settings: CurrentSettings;
  onReset: () => void;
};

export default function GamePane({ settings, onReset }: Props) {
  const courtCount = settings.courtCount;

  const [manager, setManager] = useState(create(settings));
  const [latestMembers, setLatestMembers] = useState<GameMembers>(
    manager.histories[manager.histories.length - 1]?.members || [],
  );

  const saveSettings = () => {
    window.localStorage.setItem(
      "currentSettings",
      JSON.stringify({ ...manager }),
    );
  };

  const onJoin = () => {
    setManager(manager.join());
    saveSettings();
  };
  const handleGenerate = () => {
    setLatestMembers(manager.next());
    saveSettings();
  };
  const handleRetry = () => {
    setLatestMembers(manager.retry());
    saveSettings();
  };

  const toast = useToast();
  const onLeave = (id: number) => {
    setManager(manager.leave(id));
    saveSettings();
    toast({
      title: `メンバー ${id} が離脱しました`,
      status: "warning",
      duration: 2000,
      isClosable: true,
      colorScheme: "brand",
      variant: "subtle",
    });
  };

  const clear = () => {
    window.localStorage.removeItem("currentSettings");
    onReset();
  };

  return (
    <Card my={1} py={4} height={"100dvh"}>
      <CardBody>
        <Center>
          <Stack spacing={6}>
            <CurrentMemberCountInput
              members={manager.members}
              value={manager.memberCount}
              min={courtCount * 4}
              onIncrement={onJoin}
              onDecrement={onLeave}
            />
            <HStack>
              <Button
                colorScheme={"brand"}
                leftIcon={<IoDiceOutline />}
                onClick={handleGenerate}
              >
                メンバー決め
              </Button>
              <Spacer />
              <Button
                variant={"outline"}
                leftIcon={<RepeatClockIcon />}
                size={"xs"}
                onClick={handleRetry}
                isDisabled={manager.histories.length === 0}
              >
                やり直し
              </Button>
            </HStack>
            <CourtMembersPane members={latestMembers} />
          </Stack>
        </Center>
      </CardBody>
      <Divider color={"gray.300"} />
      <CardFooter px={10} py={2}>
        <HistoryButton {...manager} />
        <Spacer />
        <MemberButton {...manager} />
        <Spacer />
        <ResetButton onReset={clear} />
      </CardFooter>
    </Card>
  );
}
