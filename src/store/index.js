import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Auth from "../services/auth";

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
    }
  },

  mutations: {
    setAccessToken(state, value) {
      state.access_token = value;
    },

    setUser(state, value) {
      state.user = value;
    }
  },

  actions: {
    async signin(context, credentials) {
      try {
        const response = await Auth.signin(credentials);
        context.commit("setAccessToken", response.data.access_token);
        context.commit("setUser", response.data.user);
      } catch (err) {
        return null;
      }
    },

    // register(context) {},

    logout(context) {
      context.commit("setAccessToken", null);
      context.commit("setUser", null);
    }
  }
});

export default store;
