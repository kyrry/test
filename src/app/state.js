
import _ from 'lodash';

export default {
	state: {
		/*.app弹出窗时fixed定位*/
		appFixed: false,
		client: '',
		historyRoute: '',
		userInfo: {},
		histData: {},
		currentRoute: '',
		client: '',
    audio: null,
    shareBankId: null,
    freeze: false,
    freezesMsg : '',
    systemMessage: {},
    toRoute: {},
    unitType: ''
	},
	mutations: {
    unitType (state, options) {
      state.unitType = options.unitType;
    },
		appFixed (state, options) {
			document.body.scrollTop = 0;
			setTimeout(function () {
				state.appFixed = options.appFixed;
			}, 0);
		},
		userInfo (state, options) {
			state.userInfo = options.userInfo;
		},
		setRouter (state, options) {
			state.historyRoute = options.historyRoute;
		},
		histData (state, options) {
			state.histData = _.assign({}, state.histData, options.data);
		},
		client (state, options) {
			state.audio = options.data;
		},
		currentRoute (state, options) {
			state.currentRoute = options.data;
		},
		setAudio (state, options) {
			state.audio = options.data;
		},
    setShareBankId (state, options) {
			state.shareBankId = options.bankId;
		},
    UserFreeze (state, options) {
      state.freeze = options.freeze;
      state.freezesMsg = options.freezesMsg;
    },
    setSystemMessage (state, options) {
      state.systemMessage = options.message;
    },
    setToRoute (state, options) {
      state.toRoute = options.data;
    }

	},
	actions: {
    unitType: ({ commit }, options) => commit(options),
		userInfo: ({ commit }, options) => commit(options),
		setRouter: ({ commit }, options) => commit(options),
		histData: ({ commit }, options) => commit(options),
		client: ({ commit }, options) => commit(options),
		currentRoute: ({ commit }, options) => commit(options),
    setAudio: ({ commit }, options) => commit(options),
    setShareBankId: ({ commit }, options) => commit(options),
    UserFreeze: ({ commit }, options) => commit(options),
    setSystemMessage: ({ commit }, options) => commit(options),
    setToRoute: ({ commit }, options) => commit(options),
	}
};
