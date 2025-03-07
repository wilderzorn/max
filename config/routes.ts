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
            name: '中间件',
            path: '/middleware',
            component: './Middleware',
          },
          {
            name: '权限演示',
            path: '/access',
            component: './Access',
          },
          {
            name: 'CRUD 示例',
            path: '/table',
            component: './Table',
          },
          {
            name: '历史数据查询',
            path: '/historyDataQuery',
            component: './HistoryDataQuery',
          },
          {
            name: '策略配置',
            path: '/strategy',
            component: './Strategy',
          },
          {
            name: '场站详情',
            path: '/stationInfo',
            component: './StationInfo',
          },
          {
            name: '数智统计',
            path: '/FICCStatistics',
            component: './FICCStatistics',
          },
          {
            name: '测试页面',
            path: '/testPage',
            component: './TestPage',
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
