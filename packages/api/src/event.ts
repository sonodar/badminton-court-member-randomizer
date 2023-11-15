import type {
  CurrentSettings,
  GameMembers,
} from "@doubles-member-generator/manager";
import { API } from "aws-amplify";
import {
  join,
  leave,
  replayGenerate,
  replayRetry,
} from "@doubles-member-generator/manager";
import { match } from "ts-pattern";
import type { GraphQLQuery, GraphQLSubscription } from "./graphql";
import { createEvent, eventsByEnvironmentID, onCreateEvent } from "./graphql";
import type {
  CreateEventMutation,
  OnCreateEventSubscription,
  OnCreateEventSubscriptionVariables,
  EventsByEnvironmentIDQuery,
  CreateEventInput,
} from "./API";

export const EventType = {
  Initialize: "INITIALIZE",
  Join: "JOIN",
  Leave: "LEAVE",
  Generate: "GENERATE",
  Retry: "RETRY",
  Finish: "FINISH",
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

type InitializeEventPayload = {
  type: typeof EventType.Initialize;
  payload: CurrentSettings;
};

type JoinEventPayload = {
  type: typeof EventType.Join;
  payload?: never;
};

type LeaveEventPayload = {
  type: typeof EventType.Leave;
  payload: { memberId: number };
};

type GenerateEventPayload = {
  type: typeof EventType.Generate;
  payload: { members: GameMembers };
};

type RetryEventPayload = {
  type: typeof EventType.Retry;
  payload: { members: GameMembers };
};

type FinishEventPayload = {
  type: typeof EventType.Finish;
  payload?: never;
};

export type EventPayload =
  | InitializeEventPayload
  | JoinEventPayload
  | LeaveEventPayload
  | GenerateEventPayload
  | RetryEventPayload
  | FinishEventPayload;

export type Event = EventPayload & {
  id: string;
  occurredAt: Date;
};

async function emit(envId: string, event: EventPayload) {
  await API.graphql<GraphQLQuery<CreateEventMutation>>({
    query: createEvent,
    variables: {
      input: {
        environmentID: envId,
        type: event.type,
        payload: JSON.stringify(event.payload || "{}"),
        occurredAt: new Date().toISOString(),
      },
    },
  });
}

export function eventEmitter(envId: string) {
  return {
    initialize: (payload: CurrentSettings) =>
      emit(envId, { type: EventType.Initialize, payload }),
    join: () => emit(envId, { type: EventType.Join }),
    leave: (memberId: number) =>
      emit(envId, { type: EventType.Leave, payload: { memberId } }),
    generate: (members: GameMembers) =>
      emit(envId, { type: EventType.Generate, payload: { members } }),
    retry: (members: GameMembers) =>
      emit(envId, { type: EventType.Retry, payload: { members } }),
    finish: () => emit(envId, { type: EventType.Finish }),
  };
}

export function subscribeEvent(
  environmentID: string,
  handler: (event: Event) => void,
) {
  const variables: OnCreateEventSubscriptionVariables = {
    filter: { environmentID: { eq: environmentID } },
  };

  const observer = API.graphql<GraphQLSubscription<OnCreateEventSubscription>>({
    query: onCreateEvent,
    variables,
  }).subscribe({
    next: ({ value }) => {
      if (!value.data?.onCreateEvent) return;
      if (value.data.onCreateEvent.environmentID !== environmentID) return; // 念のため
      const payload = JSON.parse(value.data.onCreateEvent.payload);
      const occurredAt = new Date(value.data.onCreateEvent.occurredAt);
      const event = {
        ...value.data.onCreateEvent,
        payload,
        occurredAt,
      } as Event;
      console.log("occurred event", event);
      handler(event);
    },
    error: (error) => {
      throw error;
    },
  });

  const unsubscribe = () => {
    if (!observer.closed) observer.unsubscribe();
  };

  return { unsubscribe };
}

export async function findAllEvents(id: string): Promise<Event[]> {
  const { data } = await API.graphql<GraphQLQuery<EventsByEnvironmentIDQuery>>({
    query: eventsByEnvironmentID,
    variables: { environmentID: id },
  });
  return (data?.eventsByEnvironmentID?.items || [])
    .filter((item): item is NonNullable<typeof item> => !!item)
    .map(toEvent)
    .sort((e1, e2) => {
      if (e1.type === EventType.Initialize) return -1;
      if (e1.type === EventType.Finish) return 1;
      return e1.occurredAt.getTime() - e2.occurredAt.getTime();
    });
}

function toEvent(data: Omit<CreateEventInput, "id"> & { id: string }): Event {
  const payload = JSON.parse(data.payload);
  const occurredAt = new Date(data.occurredAt);
  return { ...data, payload, occurredAt };
}

export function replayEvent(
  settings: CurrentSettings,
  event: Exclude<Event, InitializeEventPayload>,
): CurrentSettings {
  return match(event)
    .with({ type: EventType.Generate }, ({ payload }) =>
      replayGenerate(settings, payload.members),
    )
    .with({ type: EventType.Retry }, ({ payload }) =>
      replayRetry(settings, payload.members),
    )
    .with({ type: EventType.Join }, () => join(settings))
    .with({ type: EventType.Leave }, ({ payload }) =>
      leave(settings, payload.memberId),
    )
    .with({ type: EventType.Finish }, () => settings)
    .exhaustive();
}
