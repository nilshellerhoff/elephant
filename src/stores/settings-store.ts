import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type SettingsStore = {
  markPostsAsVisited: RemovableRef<boolean>;
};

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({
    markPostsAsVisited: useLocalStorage('markPostsAsVisisted', true),
  }),
  actions: {
    setMarkPostsAsVisited(value: boolean): void {
      if (value) this.markPostsAsVisited = true;
      else this.markPostsAsVisited = false;
    },
  },
});
