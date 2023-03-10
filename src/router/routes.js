
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        component: () => import('pages/IndexPage.vue'),
        meta: { requireLogin: true }
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        component: () => import('src/pages/auth/LoginComp.vue'),
      },
      {
        path: '/register',
        component: () => import('src/pages/auth/RegisterComp.vue'),
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
