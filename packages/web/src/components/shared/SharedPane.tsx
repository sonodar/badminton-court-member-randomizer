import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Card,
  CardBody,
  CardHeader,
  Center,
  HStack,
  Heading,
  IconButton,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import {
  EventType,
  type Event,
  findAllEvents,
  replayEvent,
  subscribeEvent,
} from "@doubles-member-generator/api";
import { match } from "ts-pattern";
import HistoryPane from "../common/HistoryPane.tsx";
import { useSettings, useSettingsDispatcher } from "@components/state";
import { MemberButton } from "@components/common/MemberButton.tsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages: Record<EventType, (value: any) => string> = {
  [EventType.Initialize]: () => "共有が開始されました",
  [EventType.Join]: () => "メンバーが追加されました",
  [EventType.Leave]: ({ memberId }: { memberId: number }) =>
    `メンバー ${memberId} が離脱しました`,
  [EventType.Generate]: () => "新しい組み合わせが決定しました",
  [EventType.Retry]: () => "組み合わせをやり直しました",
  [EventType.Finish]: () => "終了しました",
};

const messageColors: Record<
  EventType,
  "success" | "warning" | "info" | "error"
> = {
  [EventType.Initialize]: "success",
  [EventType.Join]: "success",
  [EventType.Leave]: "warning",
  [EventType.Generate]: "success",
  [EventType.Retry]: "warning",
  [EventType.Finish]: "error",
};

export default function SharedPane({ sharedId }: { sharedId: string }) {
  const settings = useSettings();
  const dispatcher = useSettingsDispatcher();

  const [finished, setFinished] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const proceededEvents: Record<string, Event> = {};

  useEffect(() => {
    findAllEvents(sharedId).then((events) => {
      if (events.length === 0) {
        setFinished(true);
        return;
      }
      const { settings, finished, proceeded } = replayEvents(events);
      for (const [id, event] of Object.entries(proceeded)) {
        proceededEvents[id] = event;
      }
      dispatcher.initialize(settings);
      setFinished(finished);
    });
  }, [sharedId]);

  useEffect(() => {
    if (!subscribed && settings) {
      startSubscribe(sharedId);
    }
  }, [settings, subscribed]);

  const startSubscribe = (id: string) => {
    setSubscribed(true);
    const { unsubscribe } = subscribeEvent(id, (event: Event) => {
      // 処理済みのイベントなら何もしない
      if (proceededEvents[event.id]) return;

      // 終了イベントなら unsubscribe する
      if (event.type === EventType.Finish) {
        unsubscribe();
        // setFinished(true) // setEvent の後に呼ばれるのでここではやらない
      }

      // イベントの各処理をトリガー（useEffectが発火する）
      setEvent(event);
    });
  };

  const toast = useToast();
  const toastRef = useRef<string | number>();

  useEffect(() => {
    if (!event || event.type === EventType.Initialize) return;
    proceededEvents[event.id] = event;

    if (event.type === EventType.Finish) {
      setFinished(true);
    } else {
      match(event)
        .with({ type: EventType.Generate }, ({ payload }) =>
          dispatcher.generate(payload.members),
        )
        .with({ type: EventType.Retry }, ({ payload }) =>
          dispatcher.retry(payload.members),
        )
        .with({ type: EventType.Join }, () => dispatcher.join())
        .with({ type: EventType.Leave }, ({ payload }) =>
          dispatcher.leave(payload.memberId),
        )
        .exhaustive();
    }

    const title = messages[event.type](event.payload);
    const status = messageColors[event.type];

    toastRef.current = toast({
      title,
      status,
      duration: 2000,
      isClosable: true,
      variant: "subtle",
    });
  }, [event]);

  return (
    <Card my={1} py={4}>
      <CardHeader my={0} py={0}>
        {finished ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>すでに終了しています</AlertTitle>
          </Alert>
        ) : (
          <HStack>
            <Heading size={"md"}>{settings.members.length} 人が参加中</Heading>
            <Spacer />
            <MemberButton />
            <IconButton
              size={"sm"}
              isRound={true}
              variant={"solid"}
              colorScheme={"brand"}
              fontSize={"md"}
              icon={<MdRefresh />}
              onClick={() => window.location.reload()}
              aria-label={"reload"}
            />
          </HStack>
        )}
      </CardHeader>
      <CardBody>
        <Center>
          <HistoryPane />
        </Center>
      </CardBody>
    </Card>
  );
}

function replayEvents(allEvents: Event[]) {
  const proceeded: Record<string, Event> = {};
  const [init, ...events] = allEvents;

  if (init.type !== EventType.Initialize) {
    throw new Error(`Invalid first event type: ${init.type}`);
  }

  let finished = false;
  proceeded[init.id] = init;

  const settings = events.reduce((settings, event) => {
    if (event.type === EventType.Initialize) return settings;
    finished = finished || event.type === EventType.Finish;
    proceeded[event.id] = event;
    return replayEvent(settings, event);
  }, init.payload);

  return { settings, proceeded, finished };
}
