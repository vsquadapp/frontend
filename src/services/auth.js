export function signin() {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(true);
    }, 2000);
  });
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
