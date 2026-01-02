import { RemovableRef, useLocalStorage } from '@vueuse/core/index';
import { SubredditInfo } from 'src/types/custom';
import { defineStore } from 'pinia';
import { redditGetResponse } from 'src/util/api';
import { SubredditAboutResponse } from 'src/types/reddit/subreddit';
import { getSubredditIcon } from 'src/util/subreddit';
import { getLocalStorageKey } from 'src/util/stores';

interface CacheExpiry {
  timestamp: number;
}

type SubredditInfoCache = Record<string, SubredditInfo & CacheExpiry>;

interface ContentStore {
  subredditInformation: RemovableRef<SubredditInfoCache>;
}

const storageKey = getLocalStorageKey('contentStore');
const checkType = (
  obj: Record<string, unknown>,
  key: string,
  type: string
): boolean => {
  return typeof obj[key] === type;
};

export const useContentStore = defineStore('content', {
  state: (): ContentStore => ({
    subredditInformation: useLocalStorage(
      storageKey('subredditInformation'),
      {}
    ),
  }),
  actions: {
    getSubredditInformation(code: string): Promise<SubredditInfo> {
      const subredditInfo: SubredditInfo | undefined =
        this.subredditInformation[code];
      if (subredditInfo) {
        // check if all properties are present (might not be if added in code but localstorage has old version)
        if (
          checkType(subredditInfo, 'iconUrl', 'string') &&
          checkType(subredditInfo, 'timestamp', 'number')
        ) {
          return Promise.resolve(subredditInfo);
        }
      }
      return this.loadSubredditInfoFromApi(code);
    },
    async loadSubredditInfoFromApi(code: string): Promise<SubredditInfo> {
      const response = await redditGetResponse<SubredditAboutResponse>(
        `/r/${code}/about.json`
      );
      const iconUrl = getSubredditIcon(response.data);
      this.subredditInformation[code] = {
        code,
        iconUrl,
        timestamp: Date.now(),
      };
      return { code, iconUrl };
    },
  },
});
