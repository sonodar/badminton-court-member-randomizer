/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
      id
      type
      occuredAt
      environmentID
      context
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
      id
      type
      occuredAt
      environmentID
      context
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
      id
      type
      occuredAt
      environmentID
      context
      ttl
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEnvironment = /* GraphQL */ `
  subscription OnCreateEnvironment(
    $filter: ModelSubscriptionEnvironmentFilterInput
  ) {
    onCreateEnvironment(filter: $filter) {
      id
      data
      version
      ttl
      Events {
        nextToken
      }
      finishedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEnvironment = /* GraphQL */ `
  subscription OnUpdateEnvironment(
    $filter: ModelSubscriptionEnvironmentFilterInput
  ) {
    onUpdateEnvironment(filter: $filter) {
      id
      data
      version
      ttl
      Events {
        nextToken
      }
      finishedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEnvironment = /* GraphQL */ `
  subscription OnDeleteEnvironment(
    $filter: ModelSubscriptionEnvironmentFilterInput
  ) {
    onDeleteEnvironment(filter: $filter) {
      id
      data
      version
      ttl
      Events {
        nextToken
      }
      finishedAt
      createdAt
      updatedAt
    }
  }
`;
