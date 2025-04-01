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
            name: '弹窗演示',
            path: '/popupDemo',
            component: './PopupDemo',
          },
          {
            name: '历史数据查询',
            path: '/queryHistoryData',
            component: './QueryHistoryData',
          },
          {
            name: '策略配置',
            path: '/relationship',
            component: './Relationship',
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
