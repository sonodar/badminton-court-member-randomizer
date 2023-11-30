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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEvents = /* GraphQL */ `
  query SyncEvents(
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
      }
      nextToken
      startedAt
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
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEnvironments = /* GraphQL */ `
  query SyncEnvironments(
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
          }
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
