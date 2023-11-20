/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateEvent = /* GraphQL */ `subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
  onCreateEvent(filter: $filter) {
    id
    environmentID
    type
    payload
    occurredAt
    consumed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateEventSubscriptionVariables,
  APITypes.OnCreateEventSubscription
>;
export const onUpdateEvent = /* GraphQL */ `subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
  onUpdateEvent(filter: $filter) {
    id
    environmentID
    type
    payload
    occurredAt
    consumed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateEventSubscriptionVariables,
  APITypes.OnUpdateEventSubscription
>;
export const onDeleteEvent = /* GraphQL */ `subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
  onDeleteEvent(filter: $filter) {
    id
    environmentID
    type
    payload
    occurredAt
    consumed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteEventSubscriptionVariables,
  APITypes.OnDeleteEventSubscription
>;
export const onCreateEnvironment = /* GraphQL */ `subscription OnCreateEnvironment(
  $filter: ModelSubscriptionEnvironmentFilterInput
) {
  onCreateEnvironment(filter: $filter) {
    id
    ttl
    finishedAt
    Events {
      items {
        id
        environmentID
        type
        payload
        occurredAt
        consumed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateEnvironmentSubscriptionVariables,
  APITypes.OnCreateEnvironmentSubscription
>;
export const onUpdateEnvironment = /* GraphQL */ `subscription OnUpdateEnvironment(
  $filter: ModelSubscriptionEnvironmentFilterInput
) {
  onUpdateEnvironment(filter: $filter) {
    id
    ttl
    finishedAt
    Events {
      items {
        id
        environmentID
        type
        payload
        occurredAt
        consumed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateEnvironmentSubscriptionVariables,
  APITypes.OnUpdateEnvironmentSubscription
>;
export const onDeleteEnvironment = /* GraphQL */ `subscription OnDeleteEnvironment(
  $filter: ModelSubscriptionEnvironmentFilterInput
) {
  onDeleteEnvironment(filter: $filter) {
    id
    ttl
    finishedAt
    Events {
      items {
        id
        environmentID
        type
        payload
        occurredAt
        consumed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteEnvironmentSubscriptionVariables,
  APITypes.OnDeleteEnvironmentSubscription
>;
