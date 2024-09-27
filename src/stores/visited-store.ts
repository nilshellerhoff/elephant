import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type VisitedStore = {
  visitedPosts: RemovableRef<string[]>;
};

export const useVisitedStore = defineStore('visited', {
  state: (): VisitedStore => ({
    visitedPosts: useLocalStorage('visitedPosts', []),
  }),
  actions: {
    markVisited(post: string): void {
      if (!this.visitedPosts.includes(post)) this.visitedPosts.push(post);
    },
  },
});
