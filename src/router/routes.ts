import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'contact/:steps',
        component: () => import('pages/ContactPage.vue'),
      },
      // { path: 'edit', component: () => import('pages/StepPage.vue') },
      { path: 'edit/:steps', component: () => import('pages/StepPage.vue') },
      {
        path: 'search/:steps',
        component: () => import('pages/SearchPage.vue'),
      },
      { path: 'intro/:steps', component: () => import('pages/IntroPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
