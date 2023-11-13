import type { CurrentSettings } from "@doubles-member-generator/manager";
import { API } from "aws-amplify";
import ms from "ms";
import type { GraphQLQuery, GraphQLSubscription } from "../graphql";
import {
  getEnvironment,
  createEnvironment,
  updateEnvironment,
  onUpdateEnvironment,
} from "../graphql";
import { settingsSchema } from "../util/settingsSchema";
import type {
  CreateEnvironmentMutation,
  GetEnvironmentQuery,
  OnUpdateEnvironmentSubscription,
  OnUpdateEnvironmentSubscriptionVariables,
  UpdateEnvironmentMutation,
} from "./API";

const ttl = (lifetime: number) => Math.floor((Date.now() + lifetime) / 1000);

export type Environment = CurrentSettings & {
  id: string;
  version: number;
  isFinished: boolean;
};

const find = async (id: string): Promise<Environment | null> => {
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

  return { id, version, isFinished: !!finishedAt, ...settings };
};

const subscribe = (id: string, onUpdate: (env: Environment) => void) => {
  const variables: OnUpdateEnvironmentSubscriptionVariables = {
    filter: { id: { eq: id } },
  };

  const observer = API.graphql<
    GraphQLSubscription<OnUpdateEnvironmentSubscription>
  >({ query: onUpdateEnvironment, variables }).subscribe({
    next: ({ value }) => {
      if (!value.data?.onUpdateEnvironment) return;
      if (value.data.onUpdateEnvironment.id !== id) return; // 念のため
      const { version, finishedAt, data } = value.data.onUpdateEnvironment;
      const settings = settingsSchema.parse(JSON.parse(data));
      const isFinished = !!finishedAt;
      onUpdate({ id, version, isFinished, ...settings });
    },
    error: (error) => {
      throw error;
    },
  });

  const unsubscribe = () => {
    if (!observer.closed) observer.unsubscribe();
  };

  return { unsubscribe };
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

export const environments = { find, create, update, remove, subscribe };
