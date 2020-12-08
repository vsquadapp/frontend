import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Auth from "../services/auth";
import axios from "axios";

const store = createStore({
  plugins: [createPersistedState()],

  state() {
    return {
      access_token: null,
      user: null
    };
  },

  getters: {
    isAuthenticated(state) {
      return !!state.access_token;
    },

    seller(state) {
      return state.user?.seller || null;
    },

    supplier(state) {
      return state.user?.supplier || null;
    }
  },

  mutations: {
    setAccessToken(state, value) {
      state.access_token = value;
      axios.defaults.headers.common["Authorization"] = `Bearer ${value}`;
    },

    setUser(state, value) {
      state.user = value;
    }
  },

  actions: {
    async signin(context, credentials) {
      const response = await Auth.signin(credentials);
      context.commit("setAccessToken", response.data.access_token);
      context.commit("setUser", response.data.user);
    },

    async register(context, user) {
      const response = await Auth.register(user);
      context.commit("setAccessToken", response.data.access_token);
      context.commit("setUser", response.data.user);
    },

    logout(context) {
      context.commit("setAccessToken", null);
      context.commit("setUser", null);
    }
  }
});

export default store;
