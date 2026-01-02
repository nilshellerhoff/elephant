import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { SubredditInfo } from 'src/types/custom';

export type List = {
  id: number;
  name: string;
  subreddits: SubredditInfo[];
};

export type ListsStore = {
  lists: RemovableRef<List[]>;
};

export const useListsStore = defineStore('lists', {
  state: (): ListsStore => ({
    lists: useLocalStorage('lists', []),
  }),
  getters: {
    subscriptions(): SubredditInfo[] {
      return this.lists[0]?.subreddits ?? [];
    },
  },
  actions: {
    isSubscribed(subreddit: string): boolean {
      return this.lists[0]?.subreddits.some((s) => s.code === subreddit);
    },
    subscribe(subscription: SubredditInfo) {
      if (this.lists.length == 0)
        this.lists.push({
          id: 0,
          name: 'default',
          subreddits: [],
        });

      if (!this.isSubscribed(subscription.code))
        this.lists[0].subreddits.push(subscription);
    },
    unsubscribe(code: string) {
      this.lists[0].subreddits = this.lists[0].subreddits.filter(
        (s) => s.code != code
      );
    },
    toggleSubscription(subscription: SubredditInfo) {
      if (this.isSubscribed(subscription.code))
        this.unsubscribe(subscription.code);
      else this.subscribe(subscription);
    },
  },
});
