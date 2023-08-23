import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name:'list', component: () => import('pages/ContactsList.vue') },
      { path: 'add', name: 'add', component: () => import('pages/ContactsAdd.vue') },
      { path: 'edit/:id', name: 'edit', component: () => import('pages/ContactsEdit.vue') },
      { path: 'info/:id', name: 'info', component: () => import('pages/ContactsInfo.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
