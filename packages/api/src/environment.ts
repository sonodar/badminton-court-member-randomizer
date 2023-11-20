import { DataStore } from "aws-amplify";
import ms from "ms";
import { Environment } from "./models";

const ttl = (lifetime: number) => Math.floor((Date.now() + lifetime) / 1000);

export const createEnvironment = async () => {
  return await DataStore.save(
    new Environment({
      ttl: ttl(ms("7d")),
    }),
  );
};

export const finishEnvironment = async (id: string) => {
  const entity = await DataStore.query(Environment, id);
  if (!entity) return;
  await DataStore.save(
    Environment.copyOf(entity, (updated) => {
      updated.finishedAt = new Date().toISOString();
    }),
  );
};
