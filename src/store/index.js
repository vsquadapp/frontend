import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Auth from "../services/auth";
import SellerService from "../services/sellers";
import axios from "axios";

const store = createStore({
  plugins: [createPersistedState()],

  state() {
    return {
      access_token: null,
      user: null,
      store: null
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
    },

    store(state) {
      return state.store || null;
    }
  },

  mutations: {
    setAccessToken(state, value) {
      state.access_token = value;
      axios.defaults.headers.common["Authorization"] = `Bearer ${value}`;
    },

    setUser(state, value) {
      state.user = value;
    },

    setStore(state, value) {
      state.store = value;
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
    },

    async loadStore(context, slug) {
      const store = await SellerService.findSellerBySlug(slug);
      context.commit("setStore", store);
      return store;
    }
  }
});

export default store;
