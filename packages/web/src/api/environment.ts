import type { CurrentSettings } from "@doubles-member-generator/lib";
import { API } from "aws-amplify";
import ms from "ms";
import type { CreateEnvironmentMutation, GetEnvironmentQuery } from "./API";
import { createEnvironment, updateEnvironment } from "src/graphql/mutations";
import { getEnvironment } from "src/graphql/queries";

const ttl = (lifetime: number) => Math.floor((Date.now() + lifetime) / 1000);

const find = async (id: string) => {
  const { data } = (await API.graphql({
    query: getEnvironment,
    variables: { input: { id } },
  })) as { data: GetEnvironmentQuery };
  return data.getEnvironment;
};

const create = async (settings: CurrentSettings) => {
  const { data } = (await API.graphql({
    query: createEnvironment,
    variables: {
      input: {
        version: 0,
        data: JSON.stringify({ ...settings }),
        ttl: ttl(ms("7d")),
      },
    },
  })) as { data: CreateEnvironmentMutation };
  return data.createEnvironment!;
};

const update = async (id: string, settings: CurrentSettings) => {
  const entity = await find(id);
  if (!entity) return;
  await API.graphql({
    query: updateEnvironment,
    variables: {
      input: {
        id,
        version: entity.version + 1,
        data: JSON.stringify({ ...settings }),
        ttl: ttl(ms("7d")),
      },
    },
  });
};

const remove = async (id: string) => {
  const entity = await find(id);
  if (!entity) return;
  await API.graphql({
    query: updateEnvironment,
    variables: {
      input: {
        id,
        version: entity?.version + 1,
        finishedAt: new Date().toISOString(),
      },
    },
  });
};

export const environments = { find, create, update, remove };
