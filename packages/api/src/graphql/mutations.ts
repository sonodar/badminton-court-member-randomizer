/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createEvent = /* GraphQL */ `mutation CreateEvent(
  $input: CreateEventInput!
  $condition: ModelEventConditionInput
) {
  createEvent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEventMutationVariables,
  APITypes.CreateEventMutation
>;
export const updateEvent = /* GraphQL */ `mutation UpdateEvent(
  $input: UpdateEventInput!
  $condition: ModelEventConditionInput
) {
  updateEvent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEventMutationVariables,
  APITypes.UpdateEventMutation
>;
export const deleteEvent = /* GraphQL */ `mutation DeleteEvent(
  $input: DeleteEventInput!
  $condition: ModelEventConditionInput
) {
  deleteEvent(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEventMutationVariables,
  APITypes.DeleteEventMutation
>;
export const createEnvironment = /* GraphQL */ `mutation CreateEnvironment(
  $input: CreateEnvironmentInput!
  $condition: ModelEnvironmentConditionInput
) {
  createEnvironment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateEnvironmentMutationVariables,
  APITypes.CreateEnvironmentMutation
>;
export const updateEnvironment = /* GraphQL */ `mutation UpdateEnvironment(
  $input: UpdateEnvironmentInput!
  $condition: ModelEnvironmentConditionInput
) {
  updateEnvironment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateEnvironmentMutationVariables,
  APITypes.UpdateEnvironmentMutation
>;
export const deleteEnvironment = /* GraphQL */ `mutation DeleteEnvironment(
  $input: DeleteEnvironmentInput!
  $condition: ModelEnvironmentConditionInput
) {
  deleteEnvironment(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteEnvironmentMutationVariables,
  APITypes.DeleteEnvironmentMutation
>;
