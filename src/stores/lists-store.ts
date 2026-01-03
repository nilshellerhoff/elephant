import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type Subscription = {
  code: string;
  iconUrl: string;
};

export type List = {
  id: number;
  name: string;
  subreddits: Subscription[];
};

export type ListsStore = {
  lists: RemovableRef<List[]>;
};

export const useListsStore = defineStore('lists', {
  state: (): ListsStore => ({
    lists: useLocalStorage('lists', []),
  }),
  getters: {
    subscriptions(): Subscription[] {
      return this.lists[0]?.subreddits ?? [];
    },
  },
  actions: {
    isSubscribed(subreddit: string): boolean {
      return this.lists[0]?.subreddits.some((s) => s.code === subreddit);
    },
    subscribe(subscription: Subscription) {
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
    toggleSubscription(subscription: Subscription) {
      if (this.isSubscribed(subscription.code))
        this.unsubscribe(subscription.code);
      else this.subscribe(subscription);
    },
  },
});
