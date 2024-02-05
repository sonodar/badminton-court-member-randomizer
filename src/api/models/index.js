// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const EventType = {
  "INITIALIZE": "INITIALIZE",
  "JOIN": "JOIN",
  "LEAVE": "LEAVE",
  "GENERATE": "GENERATE",
  "RETRY": "RETRY",
  "FINISH": "FINISH"
};

const { Event, Environment } = initSchema(schema);

export {
  Event,
  Environment,
  EventType
};