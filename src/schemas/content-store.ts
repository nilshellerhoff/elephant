import * as z from 'zod/mini';

export const CachingTimestampsSchema = z.object({
  timestampCached: z.number(),
  timestampAccessed: z.number(),
});

export const SubredditInfoSchema = z.object({
  code: z.string(),
  iconUrl: z.string(),
  backgroundImageUrl: z.string(),
});

export const CachedSubredditInfoSchema = z.object({
  ...SubredditInfoSchema.shape,
  ...CachingTimestampsSchema.shape,
});

export type CachedSubredditInfo = z.infer<typeof CachedSubredditInfoSchema>;
export type SubredditInfo = z.infer<typeof SubredditInfoSchema>;
