import type { CurrentSettings } from "@doubles-member-generator/lib";
import { API } from "aws-amplify";
import ms from "ms";
import type { GraphQLQuery } from "@aws-amplify/api";
import type {
  CreateEnvironmentMutation,
  GetEnvironmentQuery,
  UpdateEnvironmentMutation,
} from "./API";
import { createEnvironment, updateEnvironment } from "src/graphql/mutations";
import { getEnvironment } from "src/graphql/queries";

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
  return data?.getEnvironment;
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
