const axios = require("axios");

export function signin(credentials) {
  return axios.post(
    "http://vsquad-api.herokuapp.com/api/auth/login",
    credentials
  );
}

export function register() {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(true);
    }, 2000);
  });
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
