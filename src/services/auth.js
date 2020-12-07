const axios = require("axios");

const baseUrl = process.env.VUE_APP_BASE_URL;

export function signin(credentials) {
  return axios.post(`${baseUrl}/api/auth/login`, credentials);
}

export function register(user) {
  return axios.post(`${baseUrl}/api/auth/register`, user);
}

export function recoveryPassword() {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

export default {
  signin,
  register,
  recoveryPassword
};
