
const state = {
  loginDate: {},
};

// 页面用dispatch触发   
// this.$store.get.commit('saveloginDate', {
    // loginDate: '1234'
// });
// 如果在 mutations 里执行异步操作会发生什么事情 , 实际上并不会发生什么奇怪的事情 , 只是官方推荐 , 不要在 mutationss 里执行异步操作而已
const mutations = {
  saveloginDate (state, value) {
    // console.log('------------------');
    // console.log( state);
    // console.log( value);
    // console.log('------------------');
    state.loginDate = value.loginDate;
  },
};



const actions = {
  saveloginDate: ({ commit }, options) => commit(options),
  
};
export default {
  state,
  mutations,
  actions
};

