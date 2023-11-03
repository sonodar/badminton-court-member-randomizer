import type { CurrentSettings } from "@doubles-member-generator/lib";
import z, { type ZodType } from "zod";

const STORAGE_KEY = "currentSettings";

const currentSettingsSchema = z.object({
  courtCount: z.number(),
  members: z.array(z.number()),
  histories: z.array(
    z.object({
      members: z.array(
        z.tuple([z.number(), z.number(), z.number(), z.number()]),
      ),
      deleted: z.literal(true).optional(),
    }),
  ),
  gameCounts: z.record(
    z.number(),
    z.object({ playCount: z.number(), baseCount: z.number() }),
  ),
}) satisfies ZodType<CurrentSettings>;

const get = (): CurrentSettings | null => {
  const json = window.localStorage.getItem(STORAGE_KEY);
  if (!json) return null;

  const result = currentSettingsSchema.safeParse(JSON.parse(json));
  if (!result.success) return null;

  return result.data;
};

const save = (settings: CurrentSettings) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

const clear = () => {
  window.localStorage.removeItem(STORAGE_KEY);
};

export default { get, save, clear };
