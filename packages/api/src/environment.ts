import { API } from "aws-amplify";
import ms from "ms";
import type { GraphQLQuery } from "./graphql";
import {
  createEnvironment as createEnvironmentMutation,
  updateEnvironment,
} from "./graphql";
import type {
  CreateEnvironmentMutation,
  UpdateEnvironmentMutation,
} from "./API";

const ttl = (lifetime: number) => Math.floor((Date.now() + lifetime) / 1000);

export const createEnvironment = async () => {
  const { data, errors } = await API.graphql<
    GraphQLQuery<CreateEnvironmentMutation>
  >({
    query: createEnvironmentMutation,
    variables: { input: { ttl: ttl(ms("7d")) } },
  });
  if (errors?.length) {
    throw new Error(errors.map((e) => e.message).join(", "));
  }
  return data!.createEnvironment!;
};

export const finishEnvironment = async (id: string) => {
  await API.graphql<GraphQLQuery<UpdateEnvironmentMutation>>({
    query: updateEnvironment,
    variables: {
      input: { id, finishedAt: new Date().toISOString() },
    },
  });
};
