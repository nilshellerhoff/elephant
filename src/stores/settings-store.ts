import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type SettingsStore = {
  markPostsAsVisited: RemovableRef<boolean>;
  markPostsAsVisitedOnMediaClick: RemovableRef<boolean>;
};

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({
    markPostsAsVisited: useLocalStorage('markPostsAsVisisted', true),
    markPostsAsVisitedOnMediaClick: useLocalStorage(
      'markPostsAsVisitedOnMediaClick',
      true
    ),
  }),
  actions: {
    setMarkPostsAsVisited(value: boolean): void {
      if (value) this.markPostsAsVisited = true;
      else this.markPostsAsVisited = false;
    },
  },
});
