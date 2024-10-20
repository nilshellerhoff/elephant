import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type SettingsStore = {
  markPostsAsVisited: RemovableRef<boolean>;
  markPostsAsVisitedOnMediaClick: RemovableRef<boolean>;
  collapseStickiedCommentsByDefault: RemovableRef<boolean>;
  blurNsfwThumbnails: RemovableRef<boolean>;
};

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({
    markPostsAsVisited: useLocalStorage('markPostsAsVisisted', true),
    markPostsAsVisitedOnMediaClick: useLocalStorage(
      'markPostsAsVisitedOnMediaClick',
      true
    ),
    collapseStickiedCommentsByDefault: useLocalStorage(
      'collapseStickiedCommentsByDefault',
      true
    ),
    blurNsfwThumbnails: useLocalStorage('blurNsfwThumbnails', true),
  }),
  actions: {
    setMarkPostsAsVisited(value: boolean): void {
      if (value) this.markPostsAsVisited = true;
      else this.markPostsAsVisited = false;
    },
  },
});
