import { RemovableRef, useLocalStorage } from '@vueuse/core/index';
import { defineStore } from 'pinia';
import { redditGetResponse } from 'src/util/api';
import { SubredditAboutResponse } from 'src/types/reddit/subreddit';
import { getSubredditIcon } from 'src/util/subreddit';
import { getLocalStorageKey } from 'src/util/stores';
import {
  CachedSubredditInfoSchema,
  CachedSubredditInfo,
} from 'src/schemas/content-store';

interface ContentStore {
  subredditInformation: RemovableRef<Record<string, CachedSubredditInfo>>;
}

const storageKey = getLocalStorageKey('contentStore');

export const useContentStore = defineStore('content', {
  state: (): ContentStore => ({
    subredditInformation: useLocalStorage(
      storageKey('subredditInformation'),
      {}
    ),
  }),
  actions: {
    getSubredditInformation(code: string): Promise<CachedSubredditInfo> {
      const subredditInfo: CachedSubredditInfo | undefined =
        this.subredditInformation[code];
      if (CachedSubredditInfoSchema.safeParse(subredditInfo).success)
        return Promise.resolve(subredditInfo);
      return this.loadSubredditInfoFromApi(code);
    },
    async loadSubredditInfoFromApi(code: string): Promise<CachedSubredditInfo> {
      const response = await redditGetResponse<SubredditAboutResponse>(
        `/r/${code}/about.json`
      );
      const subredditInformation = {
        code,
        iconUrl: getSubredditIcon(response.data),
        backgroundImageUrl: response.data.data.banner_background_image,
        timestampCached: Date.now(),
      };
      this.subredditInformation[code] = subredditInformation;
      return subredditInformation;
    },
  },
});
