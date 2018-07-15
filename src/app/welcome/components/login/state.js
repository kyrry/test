
const state = {
  loginDate: {},
};

const mutations = {
  saveloginDate (state, playLoad) {
    state.loginDate = playLoad.loginDate;
  },
};

const actions = {
  test: ({ commit }, options) => commit(options),
};
export default {
  state,
  mutations,
  actions
};

