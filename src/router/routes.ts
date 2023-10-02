import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'ChatRoom', component: () => import('pages/ChatRoom.vue') },
      { path: 'QA', component: () => import('pages/QuestionAnswer.vue') },
      {
        path: 'Secretary',
        component: () => import('pages/SecretaryAnswer.vue'),
      },
      {
        path: 'Secretary/:id',
        component: () => import('pages/SecretaryAnswerId.vue'),
      },
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
