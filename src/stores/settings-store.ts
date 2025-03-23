import { RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { Dark } from 'quasar';
import { toQuasarDarkSetting } from 'src/util/quasar';

export enum DarkMode {
  'light',
  'dark',
  'auto',
}

export enum ViewMode {
  'LIST',
  'CARDS',
}

export type SettingsStore = {
  markPostsAsVisited: RemovableRef<boolean>;
  markPostsAsVisitedOnMediaClick: RemovableRef<boolean>;
  collapseStickiedCommentsByDefault: RemovableRef<boolean>;
  blurNsfwThumbnails: RemovableRef<boolean>;
  darkMode: RemovableRef<DarkMode>;
  useSentry: RemovableRef<boolean>;
  useRedditApplicationOnlyOauth: RemovableRef<boolean>;
  redditApplicationOnlyAppId: RemovableRef<string>;
  redditAuthenticationProxyUrl: RemovableRef<string | null>;
  viewMode: RemovableRef<ViewMode>;
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
    darkMode: useLocalStorage('darkMode', DarkMode.auto),
    useSentry: useLocalStorage('useSentry', false),
    useRedditApplicationOnlyOauth: useLocalStorage(
      'settings_useRedditApplicationOnlyOauth',
      false
    ),
    redditApplicationOnlyAppId: useLocalStorage(
      'settings_redditApplicationOnlyAppId',
      ''
    ),
    redditAuthenticationProxyUrl: useLocalStorage(
      'settings_redditAuthenticationProxyUrl',
      null
    ),
    viewMode: useLocalStorage('viewMode', ViewMode.LIST),
  }),
  actions: {
    init(): void {
      Dark.set(toQuasarDarkSetting(this.darkMode));
    },
    setMarkPostsAsVisited(value: boolean): void {
      if (value) this.markPostsAsVisited = true;
      else this.markPostsAsVisited = false;
    },
    setDarkMode(value: DarkMode): void {
      this.darkMode = value;
      Dark.set(toQuasarDarkSetting(value));
    },
  },
});
