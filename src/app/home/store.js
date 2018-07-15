import _ from 'lodash';

const state = [
	{ App: require('../state') },
	{ Dialog: require('~common/components/dialog/state') },
	{ Loading: require('~common/components/loading/state') },
	{ StartPage: require('~common/components/start_page/state') }
];


/**
* 页面state请按照下面格式进行添加
*/
export default {

	// 公共部分
	common: {
		App: _.find(state, 'App').App.default,
		Dialog: _.find(state, 'Dialog').Dialog.default,
		Loading: _.find(state, 'Loading').Loading.default,
		StartPage: _.find(state, 'StartPage').StartPage.default,
	},

	//路由部分
	store: []
};
