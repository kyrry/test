

/**
 * 异步按需加载模块
 */
const Home                               = resolve => require(['./components/home'], resolve);
const inforMation                        = resolve => require(['./components/inforMation'], resolve);
const personalInformation                = resolve => require(['./components/personalInformation'], resolve);
const profile                            = resolve => require(['./components/profile'], resolve);
const set                                = resolve => require(['./components/set'], resolve);
const setpwd                             = resolve => require(['./components/setpwd'], resolve);
const addCard                            = resolve => require(['./components/addCard'], resolve);
const addCardMessage                     = resolve => require(['./components/addCardMessage'], resolve);
const withdraw                           = resolve => require(['./components/withdraw'], resolve);
const count                              = resolve => require(['./components/count'], resolve);
const bankWithdraw                              = resolve => require(['./components/bankWithdraw'], resolve);

/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [

    // 个人中心
    {
      path: '/user',
      component: {
        template: '<router-view></router-view>',
      },
      meta: {
        authorization: true,
      },
      children: [

        // 首页
        {
          path: '/',
          query: {
            dt: ''
          },
          name: 'user.Home',
          component: Home,
          meta: {
            title: '个人中心',
          },
        },

          // 完善资料
          {
            path: 'inforMation',
            name: 'user.inforMation',
            component: inforMation,
            meta: {
              title: '完善资料'
            },
          },

          //审核
          {
            path: 'personalInformation',
            name: 'user.personalInformation',
            component: personalInformation,
            meta: {
              title: '审核'
            },
          },

          //个人设置
          {
            path: 'profile',
            name: 'user.profile',
            component: profile,
            meta: {
              title: '个人设置'
            },
          },

          //设置
          {
            path: 'set',
            name: 'user.set',
            component: set,
            meta: {
              title: '设置'
            },
          },

          //设置密码
          {
            path: 'setpwd',
            name: 'user.setpwd',
            component: setpwd,
            meta: {
              title: '设置密码'
            },
          },

          //添加银行卡-兑现
          {
            path: 'addCard',
            name: 'user.addCard',
            component: addCard,
            meta: {
              title: '兑现'
            },
          },

          //添加银行卡-信息
          {
            path: 'addCardMessage',
            name: 'user.addCardMessage',
            component: addCardMessage,
            meta: {
              title: '添加银行卡'
            },
          },

          //添加银行卡-提现
          {
            path: 'withdraw',
            name: 'user.withdraw',
            component: withdraw,
            meta: {
              title: '提现'
            },
          },
          //添加银行卡-我的账户
          {
            path: 'count',
            name: 'user.count',
            component: count,
            meta: {
              title: '我的账户'
            },
          },
          //银行卡提现
          {
            path: 'bankWithdraw',
            name: 'user.bankWithdraw',
            component: bankWithdraw,
            meta: {
              title: '提现'
            },
          },

      ]
    },
  ]
};

export default router;