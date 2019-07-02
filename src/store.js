import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// mutation types
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const SET_SNACKBAR = 'SET_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

const savedToken = localStorage.getItem('token');
const store = new Vuex.Store({
  state: {
    token: savedToken,
    snackbar: {
      isActive: false,
      message: '',
      color: '',
      timeout: 500,
    },
  },
  mutations: {
    [SET_TOKEN](state, payload) {
      localStorage.setItem('token', payload.token);
      state.token = payload.token;
    },
    [REMOVE_TOKEN](state) {
      localStorage.removeItem('token');
      state.token = null;
    },
    [SET_SNACKBAR](state, payload) {
      state.snackbar = {
        ...payload.snackbar,
        isActive: true,
      };
    },
    [REMOVE_SNACKBAR](state) {
      state.snackbar.isActive = false;
    },
  },
  actions: {
    setToken({ commit }, token) {
      if (token) {
        commit({
          type: SET_TOKEN,
          token,
        });
      }
    },
    showSnackbar({ commit }, snackbar) {
      const { message, color, timeout } = snackbar;
      if (message) {
        commit({
          type: SET_SNACKBAR,
          snackbar: {
            message,
            color: color || 'primary',
            timeout: timeout || 1500,
          },
        });
      }
    },
  },
});

export default store;
