import type { CurrentSettings } from "@doubles-member-generator/lib";
import { API } from "aws-amplify";
import type { CreateEnvironmentMutation, GetEnvironmentQuery } from "./API";
import { createEnvironment, updateEnvironment } from "src/graphql/mutations";
import { getEnvironment } from "src/graphql/queries";

const find = async (id: string) => {
  const { data } = (await API.graphql({
    query: getEnvironment,
    variables: { input: { id } },
  })) as { data: GetEnvironmentQuery };
  return data.getEnvironment;
};

const create = async (settings: CurrentSettings, ttl: number) => {
  const { data } = (await API.graphql({
    query: createEnvironment,
    variables: {
      input: {
        version: 0,
        data: JSON.stringify({ ...settings }),
        ttl,
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
      },
    },
  });
};

const remove = async (id: string, ttl: number) => {
  const entity = await find(id);
  if (!entity) return;
  await API.graphql({
    query: updateEnvironment,
    variables: {
      input: {
        id,
        version: entity?.version + 1,
        finishedAt: new Date().toISOString(),
        ttl,
      },
    },
  });
};

export const environmentsRepository = { find, create, update, remove };
