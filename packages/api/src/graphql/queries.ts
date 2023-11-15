/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      environmentID
      type
      payload
      occurredAt
      consumed
      createdAt
      updatedAt
    }
  }
`;
export const listEvents = /* GraphQL */ `
  query ListEvents(
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
      }
      nextToken
    }
  }
`;
export const getEnvironment = /* GraphQL */ `
  query GetEnvironment($id: ID!) {
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
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listEnvironments = /* GraphQL */ `
  query ListEnvironments(
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
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const eventsByEnvironmentID = /* GraphQL */ `
  query EventsByEnvironmentID(
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
      }
      nextToken
    }
  }
`;
