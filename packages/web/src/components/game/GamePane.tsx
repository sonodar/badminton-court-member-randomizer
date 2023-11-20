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
import {
  generate,
  retry,
  getLatestMembers,
} from "@doubles-member-generator/manager";
import React, { useEffect, useRef, useState } from "react";
import { IoDiceOutline } from "react-icons/io5";
import {
  createEnvironment,
  eventEmitter,
  finishEnvironment,
} from "@doubles-member-generator/api";
import storage from "../../util/settingsStorage";
import { ShareButton } from "./ShareButton";
import CourtMembersPane from "@components/game/CourtMembersPane";
import { CurrentMemberCountInput } from "@components/game/CurrentMemberCountInput";
import { HistoryButton } from "@components/common/HistoryButton.tsx";
import { MemberButton } from "@components/common/MemberButton.tsx";
import { ResetButton } from "@components/game/ResetButton";
import { useSettings, useSettingsDispatcher } from "@components/state";

type Props = {
  onReset: () => void;
  shareId?: string | null;
};

export default function GamePane({ onReset, shareId }: Props) {
  const settings = useSettings();
  const dispatcher = useSettingsDispatcher();

  const [environmentId, setEnvironmentId] = useState(shareId || undefined);
  const [progress, setProgress] = useState(false);

  const openProgress = () => setProgress(true);
  const closeProgress = () => setProgress(false);

  const issueShareLink = async () => {
    openProgress();
    const { id } = await createEnvironment();
    window.localStorage.setItem("shareId", id);
    setEnvironmentId(id);
    await eventEmitter(id).initialize(settings);
    closeProgress();
  };

  useEffect(() => {
    storage.save({ ...settings });
  }, [settings]);

  const handleJoin = () => {
    dispatcher.join();
    if (environmentId) {
      eventEmitter(environmentId).join();
    }
  };

  const handleGenerate = () => {
    const newSettings = generate(settings);
    const members = getLatestMembers(newSettings)!;
    dispatcher.generate(members);
    if (environmentId) {
      eventEmitter(environmentId).generate(members);
    }
  };

  const handleRetry = () => {
    const newSettings = retry(settings);
    const members = getLatestMembers(newSettings)!;
    dispatcher.retry(members);
    if (environmentId) {
      eventEmitter(environmentId).retry(members);
    }
  };

  const toast = useToast();
  const toastRef = useRef<string | number>();

  const handleLeave = (id: number) => {
    dispatcher.leave(id);
    if (environmentId) {
      eventEmitter(environmentId).leave(id);
    }
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
      eventEmitter(environmentId).finish();
      finishEnvironment(environmentId);
    }
    onReset();
  };

  return (
    <Card my={1} py={4} height={"100dvh"}>
      <CardBody>
        <Center>
          <Stack spacing={6}>
            <CurrentMemberCountInput
              onIncrement={handleJoin}
              onDecrement={handleLeave}
              isDisabled={progress}
            />
            <HStack>
              <Button
                w={"45%"}
                colorScheme={"brand"}
                leftIcon={<IoDiceOutline />}
                onClick={handleGenerate}
                isDisabled={progress}
              >
                メンバー決め
              </Button>
              <Spacer />
              <Button
                w={"45%"}
                colorScheme={"brand"}
                variant={"outline"}
                leftIcon={<RepeatClockIcon />}
                onClick={handleRetry}
                isDisabled={progress || settings.histories.length === 0}
              >
                やり直し
              </Button>
            </HStack>
            <CourtMembersPane members={getLatestMembers(settings) || []} />
          </Stack>
        </Center>
      </CardBody>
      <Divider color={"gray.300"} />
      <CardFooter px={10} py={2}>
        <HistoryButton isDisabled={progress} />
        <Spacer />
        <MemberButton isDisabled={progress} />
        <Spacer />
        <ShareButton
          sharedId={environmentId}
          onIssue={issueShareLink}
          isDisabled={progress}
        />
        <Spacer />
        <ResetButton onReset={clear} isDisabled={progress} />
      </CardFooter>
    </Card>
  );
}
