import type { CurrentSettings } from "@doubles-member-generator/manager";
import type { ZodType } from "zod";
import { z } from "zod";

export const settingsSchema = z.object({
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
    z.string(),
    z.object({ playCount: z.number(), baseCount: z.number() }),
  ),
}) satisfies ZodType<CurrentSettings>;
