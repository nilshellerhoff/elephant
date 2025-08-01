import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/r/:subreddit?post=:permalink',
  //   component: () => import('layouts/SplitLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('pages/Subreddit/subreddit.vue'),
  //     },
  //   ],
  // },
  {
    path: '/',
    component: () =>
      window.innerWidth > 1500
        ? import('layouts/SplitLayout.vue')
        : import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        components: {
          default: () => import('pages/HomePage.vue'),
          side: () => import('pages/PostPage.vue'),
        },
      },
      {
        path: '/r/:subreddit',
        components: {
          default: () => import('pages/SubredditPage.vue'),
          side: () => import('pages/PostPage.vue'),
        },
      },
      {
        path: 'popular',
        components: {
          default: () => import('pages/PopularPage.vue'),
          side: () => import('pages/PostPage.vue'),
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'lists', component: () => import('pages/ListsPage.vue') },
      { path: 'search', component: () => import('pages/SearchPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      {
        path: 'u/:username',
        component: () => import('pages/UserPage.vue'),
      },
      { path: 'user/:username', redirect: (to) => `/u/${to.params.username}` },
      {
        path: '/r/:subreddit/comments/:commentsid/:seo?',
        redirect: (to) => ({
          path: `r/${to.params.subreddit}`,
          query: { post: to.fullPath },
        }),
      },
    ],
  },

  // {
  //   path: '/r/:subreddit/comments/', component: () => import('layouts/PopupLayout.vue'),
  //   children: [
  //     {
  //       path: ':id/:seo?', component: () => import('pages/PostPage.vue')
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
