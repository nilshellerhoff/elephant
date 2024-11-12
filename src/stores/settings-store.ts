import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { Dark } from 'quasar';

export enum DarkMode {
  'light',
  'dark',
}

export type SettingsStore = {
  markPostsAsVisited: RemovableRef<boolean>;
  markPostsAsVisitedOnMediaClick: RemovableRef<boolean>;
  collapseStickiedCommentsByDefault: RemovableRef<boolean>;
  blurNsfwThumbnails: RemovableRef<boolean>;
  darkMode: RemovableRef<DarkMode>;
  useSentry: RemovableRef<boolean>;
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
    darkMode: useLocalStorage('darkMode', DarkMode.light),
    useSentry: useLocalStorage('useSentry', false),
  }),
  actions: {
    init(): void {
      Dark.set(this.darkMode == DarkMode.dark);
    },
    setMarkPostsAsVisited(value: boolean): void {
      if (value) this.markPostsAsVisited = true;
      else this.markPostsAsVisited = false;
    },
    toggleDarkMode() {
      Dark.toggle();
      this.darkMode = Dark.isActive ? DarkMode.dark : DarkMode.light;
    },
  },
});
