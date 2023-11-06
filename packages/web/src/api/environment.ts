import type { CurrentSettings } from "@doubles-member-generator/lib";
import { API } from "aws-amplify";
import ms from "ms";
import type { GraphQLQuery } from "@aws-amplify/api";
import { createEnvironment, updateEnvironment } from "../graphql/mutations";
import { getEnvironment } from "../graphql/queries";
import { settingsSchema } from "../util/settingsSchema";
import type {
  CreateEnvironmentMutation,
  GetEnvironmentQuery,
  UpdateEnvironmentMutation,
} from "./API";

const ttl = (lifetime: number) => Math.floor((Date.now() + lifetime) / 1000);

const find = async (id: string) => {
  const { data, errors } = await API.graphql<GraphQLQuery<GetEnvironmentQuery>>(
    {
      query: getEnvironment,
      variables: { id },
    },
  );
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join(", "));
  }
  if (!data?.getEnvironment) {
    return null;
  }

  const { version, finishedAt } = data.getEnvironment;
  const settings = settingsSchema.parse(JSON.parse(data.getEnvironment.data));

  return { id, version, finishedAt, ...settings };
};

const create = async (settings: CurrentSettings) => {
  const { data, errors } = await API.graphql<
    GraphQLQuery<CreateEnvironmentMutation>
  >({
    query: createEnvironment,
    variables: {
      input: {
        version: 0,
        data: JSON.stringify({ ...settings }),
        ttl: ttl(ms("7d")),
      },
    },
  });
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join(", "));
  }
  return data!.createEnvironment!;
};

const update = async (id: string, settings: CurrentSettings) => {
  const entity = await find(id);
  if (!entity) return;
  const { data, errors } = await API.graphql<
    GraphQLQuery<UpdateEnvironmentMutation>
  >({
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
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join(", "));
  }
  return data!.updateEnvironment!;
};

const remove = async (id: string) => {
  const entity = await find(id);
  if (!entity) return;
  const { errors } = await API.graphql<GraphQLQuery<UpdateEnvironmentMutation>>(
    {
      query: updateEnvironment,
      variables: {
        input: {
          id,
          version: entity?.version + 1,
          finishedAt: new Date().toISOString(),
        },
      },
    },
  );
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join(", "));
  }
};

export const environments = { find, create, update, remove };
