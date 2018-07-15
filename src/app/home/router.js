



/**
 * 异步按需加载模块
 */
const Home                           = resolve => require(['./components/home'], resolve);
const orderList                      = resolve => require(['./components/orderList'], resolve);
const compensation                   = resolve => require(['./components/compensation'], resolve);
const record                         = resolve => require(['./components/record'], resolve);
const detail                         = resolve => require(['./components/detail'], resolve);
const service                        = resolve => require(['./components/service'], resolve);
const erInvite                       = resolve => require(['./components/erInvite'], resolve);
const toApplay                       = resolve => require(['./components/toApplay'], resolve);
const bannerDetail                       = resolve => require(['./components/bannerDetail'], resolve);
const invite                       = resolve => require(['./components/invite'], resolve);





/**
 * 路由配置
 */
let router = {
  linkActiveClass: 'active',
  routes: [
    // 首页
    {
      path: '/home',
      name: 'home.Home',
      component: Home,
      meta: {
        title: '多多',
        authorization: true,
      }
    },
    //订单
    {
      path: '/orderList',
      name: 'home.orderList',
      component: orderList,
      meta: {
        title: '订单',
        authorization: true,
      }
    },
    //金币补差
    {
      path: '/compensation',
      name: 'home.compensation',
      component: compensation,
      meta: {
        title: '金币补差',
        authorization: true,
      }
    },
    //金币记录
    {
      path: '/record',
      name: 'home.record',
      component: record,
      meta: {
        title: '金币记录',
        authorization: true,
      }
    },
    //活动详情
    {
      path: '/detail',
      name: 'home.detail',
      component: detail,
      meta: {
        title: '活动详情',
        authorization: true,
      }
    },

    //客服
    {
      path: '/service',
      name: 'home.service',
      component: service,
      meta: {
        title: '客服',
        authorization: true,
      }
    },

    //二维码邀请
    {
      path: '/erInvite',
      name: 'home.erInvite',
      component: erInvite,
      meta: {
        title: '二维码邀请',
        authorization: true,
      }
    },
    //去申请
    {
      path: '/toApplay',
      name: 'home.toApplay',
      component: toApplay,
      meta: {
        title: '去申请',
        authorization: true,
      }
    },
    //banner-详情
    {
      path: '/bannerDetail',
      name: 'home.bannerDetail',
      component: bannerDetail,
      meta: {
        title: '详情',
        authorization: true,
      }
    },
    //banner-详情
    {
      path: '/invite',
      name: 'home.invite',
      component: invite,
      meta: {
        title: '邀请',
        authorization: true,
      }
    },

  ]
};

export default router;
