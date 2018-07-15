// import _   		from 'lodash';

const state = [
  //存进去vuex的state
//   { App: require('../state') },
  { Login 		            : require('./components/login/state') },
];


/**
* 页面state请按照下面格式进行添加
*/
export default {

	// 公共部分
	// common: {
    //    App: _.find(state, 'App').App.default,
	// },

	//路由部分  （哪个路由需要使用到取vuex）
	store: [

		// 登录页 
		{
			name 		: 'welcome.Login',
			modules : {
				Login: _.find(state, 'Login').Login.default,
			}
		},
		// 登录页 
		{
			name 		: 'welcome.Register',
			modules : {
				Login: _.find(state, 'Login').Login.default,
			}
		},
		{
			name 		: 'welcome.Register',
			modules : {
				Login: _.find(state, 'Login').Login.default,
			}
		},
		{
			name 		: 'user.Home',
			modules : {
				Login: _.find(state, 'Login').Login.default,
			}
		},
	]
};
