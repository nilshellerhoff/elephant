import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SubredditPage.vue') },
      {
        path: 'r/:subreddit',
        component: () => import('pages/SubredditPage.vue'),
        // children: [
        //   {
        //     path: 'comments/:commentsid/:seo?',
        //     component: () => import('pages/PostPage.vue'),
        //   },
        // ],
      },
      { path: 'popular', component: () => import('pages/SubredditPage.vue') },
      { path: 'search', component: () => import('pages/SearchPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
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
