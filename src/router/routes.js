
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/elections', component: () => import('pages/Elections.vue') },
      { path: '/vote/:id', component: () => import('pages/Vote.vue') },
      { path: '/Login', component: () => import('pages/Login.vue'), meta:{noAuth: true}, },
      { path: '/Register', component: () => import('pages/Register.vue'), meta:{noAuth: true}, },
      { path: '/admin', component: () => import('pages/admin.vue'), meta:{adminUser: true} },
      { path: '/settings', component: () => import('pages/Settings.vue'), meta:{auth: true} },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
