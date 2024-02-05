/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
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
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
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
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
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
    }
  }
`;
export const createEnvironment = /* GraphQL */ `
  mutation CreateEnvironment(
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
export const updateEnvironment = /* GraphQL */ `
  mutation UpdateEnvironment(
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
export const deleteEnvironment = /* GraphQL */ `
  mutation DeleteEnvironment(
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
