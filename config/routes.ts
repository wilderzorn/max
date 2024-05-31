export default [
  {
    path: '/user',
    component: '@/layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      { name: 'login', path: '/user/login', component: './Login' },
    ],
  },
  {
    path: '/',
    component: '@/layouts/SecurityLayout',
    authority: ['admin'],
    routes: [
      {
        path: '/',
        component: '@/layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/home',
          },
          {
            name: '首页',
            path: '/home',
            component: './Home',
          },
          {
            name: '权限演示',
            path: '/access',
            component: './Access',
          },
          {
            name: ' CRUD 示例',
            path: '/table',
            component: './Table',
          },
          { path: '/childWeb', component: './Micro' }, // 运营监控
          { path: '/transition', component: './Micro' }, // 运营监控
          {
            path: '*',
            component: './404',
          },
        ],
      },
    ],
  },
];
