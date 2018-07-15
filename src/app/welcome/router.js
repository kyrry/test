
/**
 * 异步按需加载模块
 */
const Login                          = resolve => require(['./components/login'], resolve);
const Register                       = resolve => require(['./components/register'], resolve);
const Findpwd                        = resolve => require(['./components/findpwd'], resolve);
const wRegister                      = resolve => require(['./components/wRegister'], resolve);
const relevance                      = resolve => require(['./components/relevance'], resolve);
// const invite                         = resolve => require(['./components/invite'], resolve);
const modifypwd                         = resolve => require(['./components/modifypwd'], resolve);


/**
* 路由配置
*/
let router = {
  linkActiveClass: 'active',

  routes: [

    // 用户登录
    {
      path: '/login',
      query: {
        dt: ''
      },
      name: 'welcome.Login',
      component: Login,
      meta: {
        title: '用户登录',
      },
    },

    // 新用户用户注册
    {
      path: '/register',
      name: 'welcome.Register',
      component: Register,
      meta: {
        title: '用户注册',
      },
    },

    // 微信注册登录
    {
      path: '/wRegister',
      name: 'welcome.wRegister',
      component: wRegister,
      meta: {
        title: '微信注册登陆',
      },
    },

    // 微信注册登录
    {
      path: '/relevance',
      name: 'welcome.relevance',
      component: relevance,
      meta: {
        title: '注册关联',
      },
    },

    // 找回密码
    {
      path: '/findpwd',
      name: 'welcome.Findpwd',
      component: Findpwd,
      meta: {
        title: '修改密码',
      },
    },
    //邀请
    // {
    //   path: '/invite',
    //   name: 'welcome.invite',
    //   component: invite,
    //   meta: {
    //     title: '邀请',
    //   },
    // },
    //修改密码
    {
      path: '/modifypwd',
      name: 'welcome.modifypwd',
      component: modifypwd,
      meta: {
        title: '修改密码',
      },
    },


  ]
};

export default router;
