import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { useSettingsStore } from 'stores/settings-store';

export type VisitedStore = {
  visitedPosts: RemovableRef<string[]>;
};

export const useVisitedStore = defineStore('visited', {
  state: (): VisitedStore => ({
    visitedPosts: useLocalStorage('visitedPosts', []),
  }),
  actions: {
    markVisited(post: string): void {
      const settingsStore = useSettingsStore();
      if (settingsStore.markPostsAsVisited) {
        if (!this.visitedPosts.includes(post)) this.visitedPosts.push(post);
      }
    },
    deleteVisitedInformation(): void {
      this.visitedPosts = [];
    },
  },
});
