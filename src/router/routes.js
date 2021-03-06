
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/a',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') }
    ]
  },
  {
    path: '/timetable',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TimeTable.vue') }
    ]
  },
  {
    path: '/add',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/addSubject.vue') }
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
