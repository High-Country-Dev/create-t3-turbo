import { z } from "zod";

export const MINUTE_MS = 1000 * 60;
export const HOUR_MS = MINUTE_MS * 60;
export const DAY_MS = HOUR_MS * 24;
export const WEEK_MS = DAY_MS * 7;

export const ID = z.object({ id: z.string().uuid() });
export const IDs = z.object({ ids: z.array(z.string().uuid()) });
