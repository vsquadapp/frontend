const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function products(supplier) {
  return axios.get(`${baseUrl}/api/suppliers/${supplier}/products`);
}

export default {
  products
};
