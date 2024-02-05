import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum EventType {
  INITIALIZE = "INITIALIZE",
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  GENERATE = "GENERATE",
  RETRY = "RETRY",
  FINISH = "FINISH"
}



type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly environmentID: string;
  readonly type: EventType | keyof typeof EventType;
  readonly payload: string;
  readonly occurredAt: string;
  readonly consumed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly environmentID: string;
  readonly type: EventType | keyof typeof EventType;
  readonly payload: string;
  readonly occurredAt: string;
  readonly consumed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerEnvironment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Environment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ttl: number;
  readonly finishedAt?: string | null;
  readonly Events?: (Event | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEnvironment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Environment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly ttl: number;
  readonly finishedAt?: string | null;
  readonly Events: AsyncCollection<Event>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Environment = LazyLoading extends LazyLoadingDisabled ? EagerEnvironment : LazyEnvironment

export declare const Environment: (new (init: ModelInit<Environment>) => Environment) & {
  copyOf(source: Environment, mutator: (draft: MutableModel<Environment>) => MutableModel<Environment> | void): Environment;
}