import type { ZodType } from "zod";
import { z } from "zod";
import type { CurrentSettings, GameMembers } from "./types";

const gameMembers = z.array(
  z.tuple([z.number(), z.number(), z.number(), z.number()]),
) satisfies ZodType<GameMembers>;

const settings = z.object({
  courtCount: z.number(),
  members: z.array(z.number()),
  histories: z.array(
    z.object({
      members: gameMembers,
      restMembers: z.array(z.number()),
      deleted: z.literal(true).optional(),
    }),
  ),
  gameCounts: z.record(
    z.string(),
    z.object({ playCount: z.number(), baseCount: z.number() }),
  ),
  algorithm: z.enum(["DISCRETENESS", "EVENNESS"]),
}) satisfies ZodType<CurrentSettings>;

export function toSettings(data: string | object): CurrentSettings {
  if (typeof data === "string") {
    return settings.parse(JSON.parse(data));
  }
  return settings.parse(data);
}
