const axios = require("axios");

const baseUrl = "http://localhost:8000/api";

export function signin(credentials) {
  return axios.post(`${baseUrl}/auth/login`, credentials);
}

export function register(user) {
  return axios.post(`${baseUrl}/auth/register`, user);
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
