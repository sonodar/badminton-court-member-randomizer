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
} from "@doubles-member-generator/manager";
import { create } from "@doubles-member-generator/manager";
import React, { useEffect, useRef, useState } from "react";
import { IoDiceOutline } from "react-icons/io5";
import storage from "../../util/settingsStorage";
import { ShareButton } from "./ShareButton";
import CourtMembersPane from "@components/game/CourtMembersPane.tsx";
import { CurrentMemberCountInput } from "@components/game/CurrentMemberCountInput.tsx";
import { HistoryButton } from "@components/game/HistoryButton.tsx";
import { MemberButton } from "@components/game/MemberButton.tsx";
import { ResetButton } from "@components/game/ResetButton.tsx";
import { environments } from "src/api";

type Props = {
  settings: CurrentSettings;
  onReset: () => void;
  shareId?: string | null;
};

export default function GamePane({ settings, onReset, shareId }: Props) {
  const courtCount = settings.courtCount;

  const [manager, setManager] = useState(create(settings));
  const [latestMembers, setLatestMembers] = useState<GameMembers>(
    manager.histories[manager.histories.length - 1]?.members || [],
  );

  const [environmentId, setEnvironmentId] = useState(shareId || undefined);
  const [progress, setProgress] = useState(false);

  const openProgress = () => setProgress(true);
  const closeProgress = () => setProgress(false);

  const issueShareLink = async () => {
    openProgress();
    const { id } = await environments.create(manager);
    window.localStorage.setItem("shareId", id);
    setEnvironmentId(id);
    closeProgress();
  };

  const saveSettings = async (): Promise<void> => {
    storage.save({ ...manager });
    if (environmentId) {
      openProgress();
      await environments.update(environmentId, manager);
      closeProgress();
    }
  };

  useEffect(() => {
    saveSettings();
  }, [manager]);

  const onJoin = () => {
    setManager(manager.join());
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
  const toastRef = useRef<string | number>();

  const onLeave = (id: number) => {
    setManager(manager.leave(id));
    toastRef.current = toast({
      title: `メンバー ${id} が離脱しました`,
      status: "warning",
      duration: 2000,
      isClosable: true,
      colorScheme: "brand",
      variant: "subtle",
    });
  };

  const clear = () => {
    storage.clear();
    window.localStorage.removeItem("shareId");
    if (environmentId) {
      environments.remove(environmentId);
    }
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
              isDisabled={progress}
            />
            <HStack>
              <Button
                colorScheme={"brand"}
                leftIcon={<IoDiceOutline />}
                onClick={handleGenerate}
                isDisabled={progress}
              >
                メンバー決め
              </Button>
              <Spacer />
              <Button
                variant={"outline"}
                leftIcon={<RepeatClockIcon />}
                size={"xs"}
                onClick={handleRetry}
                isDisabled={progress || manager.histories.length === 0}
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
        <HistoryButton {...manager} isDisabled={progress} />
        <Spacer />
        <MemberButton {...manager} isDisabled={progress} />
        <Spacer />
        <ShareButton
          sharedId={environmentId}
          onIssue={issueShareLink}
          isDisabled={progress || manager.histories.length === 0}
        />
        <Spacer />
        <ResetButton onReset={clear} isDisabled={progress} />
      </CardFooter>
    </Card>
  );
}
