/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEventInput = {
  id?: string | null;
  type: EventType;
  occuredAt: string;
  environmentID: string;
  context: string;
  ttl: number;
};

export enum EventType {
  INITIALIZE = "INITIALIZE",
  JOIN = "JOIN",
  LEAVE = "LEAVE",
  GENERATE = "GENERATE",
  RETRY = "RETRY",
  FINISH = "FINISH",
}

export type ModelEventConditionInput = {
  type?: ModelEventTypeInput | null;
  occuredAt?: ModelStringInput | null;
  environmentID?: ModelIDInput | null;
  context?: ModelStringInput | null;
  ttl?: ModelIntInput | null;
  and?: Array<ModelEventConditionInput | null> | null;
  or?: Array<ModelEventConditionInput | null> | null;
  not?: ModelEventConditionInput | null;
};

export type ModelEventTypeInput = {
  eq?: EventType | null;
  ne?: EventType | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Event = {
  __typename: "Event";
  id: string;
  type: EventType;
  occuredAt: string;
  environmentID: string;
  context: string;
  ttl: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateEventInput = {
  id: string;
  type?: EventType | null;
  occuredAt?: string | null;
  environmentID?: string | null;
  context?: string | null;
  ttl?: number | null;
};

export type DeleteEventInput = {
  id: string;
};

export type CreateEnvironmentInput = {
  id?: string | null;
  data: string;
  version: number;
  ttl: number;
  finishedAt?: string | null;
};

export type ModelEnvironmentConditionInput = {
  data?: ModelStringInput | null;
  version?: ModelIntInput | null;
  ttl?: ModelIntInput | null;
  finishedAt?: ModelStringInput | null;
  and?: Array<ModelEnvironmentConditionInput | null> | null;
  or?: Array<ModelEnvironmentConditionInput | null> | null;
  not?: ModelEnvironmentConditionInput | null;
};

export type Environment = {
  __typename: "Environment";
  id: string;
  data: string;
  version: number;
  ttl: number;
  Events?: ModelEventConnection | null;
  finishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection";
  items: Array<Event | null>;
  nextToken?: string | null;
};

export type UpdateEnvironmentInput = {
  id: string;
  data?: string | null;
  version?: number | null;
  ttl?: number | null;
  finishedAt?: string | null;
};

export type DeleteEnvironmentInput = {
  id: string;
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null;
  type?: ModelEventTypeInput | null;
  occuredAt?: ModelStringInput | null;
  environmentID?: ModelIDInput | null;
  context?: ModelStringInput | null;
  ttl?: ModelIntInput | null;
  and?: Array<ModelEventFilterInput | null> | null;
  or?: Array<ModelEventFilterInput | null> | null;
  not?: ModelEventFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type ModelEnvironmentFilterInput = {
  id?: ModelIDInput | null;
  data?: ModelStringInput | null;
  version?: ModelIntInput | null;
  ttl?: ModelIntInput | null;
  finishedAt?: ModelStringInput | null;
  and?: Array<ModelEnvironmentFilterInput | null> | null;
  or?: Array<ModelEnvironmentFilterInput | null> | null;
  not?: ModelEnvironmentFilterInput | null;
};

export type ModelEnvironmentConnection = {
  __typename: "ModelEnvironmentConnection";
  items: Array<Environment | null>;
  nextToken?: string | null;
};

export type ModelSubscriptionEventFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  type?: ModelSubscriptionStringInput | null;
  occuredAt?: ModelSubscriptionStringInput | null;
  environmentID?: ModelSubscriptionIDInput | null;
  context?: ModelSubscriptionStringInput | null;
  ttl?: ModelSubscriptionIntInput | null;
  and?: Array<ModelSubscriptionEventFilterInput | null> | null;
  or?: Array<ModelSubscriptionEventFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  in?: Array<number | null> | null;
  notIn?: Array<number | null> | null;
};

export type ModelSubscriptionEnvironmentFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  data?: ModelSubscriptionStringInput | null;
  version?: ModelSubscriptionIntInput | null;
  ttl?: ModelSubscriptionIntInput | null;
  finishedAt?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionEnvironmentFilterInput | null> | null;
  or?: Array<ModelSubscriptionEnvironmentFilterInput | null> | null;
};

export type CreateEventMutationVariables = {
  input: CreateEventInput;
  condition?: ModelEventConditionInput | null;
};

export type CreateEventMutation = {
  createEvent?: {
    __typename: "Event";
    id: string;
    type: EventType;
    occuredAt: string;
    environmentID: string;
    context: string;
    ttl: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateEventMutationVariables = {
  input: UpdateEventInput;
  condition?: ModelEventConditionInput | null;
};

export type UpdateEventMutation = {
  updateEvent?: {
    __typename: "Event";
    id: string;
    type: EventType;
    occuredAt: string;
    environmentID: string;
    context: string;
    ttl: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteEventMutationVariables = {
  input: DeleteEventInput;
  condition?: ModelEventConditionInput | null;
};

export type DeleteEventMutation = {
  deleteEvent?: {
    __typename: "Event";
    id: string;
    type: EventType;
    occuredAt: string;
    environmentID: string;
    context: string;
    ttl: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateEnvironmentMutationVariables = {
  input: CreateEnvironmentInput;
  condition?: ModelEnvironmentConditionInput | null;
};

export type CreateEnvironmentMutation = {
  createEnvironment?: {
    __typename: "Environment";
    id: string;
    data: string;
    version: number;
    ttl: number;
    Events?: {
      __typename: "ModelEventConnection";
      nextToken?: string | null;
    } | null;
    finishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateEnvironmentMutationVariables = {
  input: UpdateEnvironmentInput;
  condition?: ModelEnvironmentConditionInput | null;
};

export type UpdateEnvironmentMutation = {
  updateEnvironment?: {
    __typename: "Environment";
    id: string;
    data: string;
    version: number;
    ttl: number;
    Events?: {
      __typename: "ModelEventConnection";
      nextToken?: string | null;
    } | null;
    finishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteEnvironmentMutationVariables = {
  input: DeleteEnvironmentInput;
  condition?: ModelEnvironmentConditionInput | null;
};

export type DeleteEnvironmentMutation = {
  deleteEnvironment?: {
    __typename: "Environment";
    id: string;
    data: string;
    version: number;
    ttl: number;
    Events?: {
      __typename: "ModelEventConnection";
      nextToken?: string | null;
    } | null;
    finishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type GetEventQueryVariables = {
  id: string;
};

export type GetEventQuery = {
  getEvent?: {
    __typename: "Event";
    id: string;
    type: EventType;
    occuredAt: string;
    environmentID: string;
    context: string;
    ttl: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListEventsQuery = {
  listEvents?: {
    __typename: "ModelEventConnection";
    items: Array<{
      __typename: "Event";
      id: string;
      type: EventType;
      occuredAt: string;
      environmentID: string;
      context: string;
      ttl: number;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type EventsByEnvironmentIDQueryVariables = {
  environmentID: string;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelEventFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type EventsByEnvironmentIDQuery = {
  eventsByEnvironmentID?: {
    __typename: "ModelEventConnection";
    items: Array<{
      __typename: "Event";
      id: string;
      type: EventType;
      occuredAt: string;
      environmentID: string;
      context: string;
      ttl: number;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetEnvironmentQueryVariables = {
  id: string;
};

export type GetEnvironmentQuery = {
  getEnvironment?: {
    __typename: "Environment";
    id: string;
    data: string;
    version: number;
    ttl: number;
    Events?: {
      __typename: "ModelEventConnection";
      nextToken?: string | null;
    } | null;
    finishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListEnvironmentsQueryVariables = {
  filter?: ModelEnvironmentFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListEnvironmentsQuery = {
  listEnvironments?: {
    __typename: "ModelEnvironmentConnection";
    items: Array<{
      __typename: "Environment";
      id: string;
      data: string;
      version: number;
      ttl: number;
      finishedAt?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null;
};

export type OnCreateEventSubscription = {
  onCreateEvent?: {
    __typename: "Event";
    id: string;
    type: EventType;
    occuredAt: string;
    environmentID: string;
    context: string;
    ttl: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null;
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?: {
    __typename: "Event";
    id: string;
    type: EventType;
    occuredAt: string;
    environmentID: string;
    context: string;
    ttl: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteEventSubscriptionVariables = {
  filter?: ModelSubscriptionEventFilterInput | null;
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?: {
    __typename: "Event";
    id: string;
    type: EventType;
    occuredAt: string;
    environmentID: string;
    context: string;
    ttl: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateEnvironmentSubscriptionVariables = {
  filter?: ModelSubscriptionEnvironmentFilterInput | null;
};

export type OnCreateEnvironmentSubscription = {
  onCreateEnvironment?: {
    __typename: "Environment";
    id: string;
    data: string;
    version: number;
    ttl: number;
    Events?: {
      __typename: "ModelEventConnection";
      nextToken?: string | null;
    } | null;
    finishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateEnvironmentSubscriptionVariables = {
  filter?: ModelSubscriptionEnvironmentFilterInput | null;
};

export type OnUpdateEnvironmentSubscription = {
  onUpdateEnvironment?: {
    __typename: "Environment";
    id: string;
    data: string;
    version: number;
    ttl: number;
    Events?: {
      __typename: "ModelEventConnection";
      nextToken?: string | null;
    } | null;
    finishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteEnvironmentSubscriptionVariables = {
  filter?: ModelSubscriptionEnvironmentFilterInput | null;
};

export type OnDeleteEnvironmentSubscription = {
  onDeleteEnvironment?: {
    __typename: "Environment";
    id: string;
    data: string;
    version: number;
    ttl: number;
    Events?: {
      __typename: "ModelEventConnection";
      nextToken?: string | null;
    } | null;
    finishedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};
