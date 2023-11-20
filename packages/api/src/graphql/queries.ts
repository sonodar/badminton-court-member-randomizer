/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getEvent = /* GraphQL */ `query GetEvent($id: ID!) {
  getEvent(id: $id) {
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
` as GeneratedQuery<APITypes.GetEventQueryVariables, APITypes.GetEventQuery>;
export const listEvents = /* GraphQL */ `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
}
` as GeneratedQuery<
  APITypes.ListEventsQueryVariables,
  APITypes.ListEventsQuery
>;
export const syncEvents = /* GraphQL */ `query SyncEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEvents(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
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
}
` as GeneratedQuery<
  APITypes.SyncEventsQueryVariables,
  APITypes.SyncEventsQuery
>;
export const getEnvironment = /* GraphQL */ `query GetEnvironment($id: ID!) {
  getEnvironment(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetEnvironmentQueryVariables,
  APITypes.GetEnvironmentQuery
>;
export const listEnvironments = /* GraphQL */ `query ListEnvironments(
  $filter: ModelEnvironmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listEnvironments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEnvironmentsQueryVariables,
  APITypes.ListEnvironmentsQuery
>;
export const syncEnvironments = /* GraphQL */ `query SyncEnvironments(
  $filter: ModelEnvironmentFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEnvironments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncEnvironmentsQueryVariables,
  APITypes.SyncEnvironmentsQuery
>;
export const eventsByEnvironmentID = /* GraphQL */ `query EventsByEnvironmentID(
  $environmentID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  eventsByEnvironmentID(
    environmentID: $environmentID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
}
` as GeneratedQuery<
  APITypes.EventsByEnvironmentIDQueryVariables,
  APITypes.EventsByEnvironmentIDQuery
>;
