import * as z from 'zod/mini';

export const CachedSubredditInfoSchema = z.object({
  code: z.string(),
  iconUrl: z.string(),
  backgroundImageUrl: z.string(),
  timestampCached: z.number(),
});

export type CachedSubredditInfo = z.infer<typeof CachedSubredditInfoSchema>;
export type SubredditInfo = Omit<CachedSubredditInfo, 'timestampCached'>;
