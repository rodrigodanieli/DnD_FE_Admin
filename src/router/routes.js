
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'rpgs',
        component: () => import('pages/RPGs/ListRpg.vue'),
        meta: {
          menu: true,
          icon: 'public',
          label: 'RPGs'
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Auth/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
