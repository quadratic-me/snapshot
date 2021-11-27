import { createStore } from 'vuex';

const store = createStore({
  state: {
    upid: {
      email: '',
      evmKeys: [],
      username: ''
    },
    status: false
  },
  mutations: {
    setUpId: function (state, params) {
      state.upid = params;
      state.status = true;
    },
    reset: function (state) {
      state.upid = {
        email: '',
        evmKeys: [],
        username: ''
      };
      state.status = false;
    }
  },
  getters: {
    getUpId: function (state) {
      return state.upid;
    }
  }
});

export { store };
