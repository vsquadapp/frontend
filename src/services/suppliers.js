const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function products(supplier, page) {
  return axios.get(
    `${baseUrl}/api/suppliers/${supplier}/products?page=${page}`
  );
}

export function getProductById(supplier, product) {
  return axios.get(`${baseUrl}/api/suppliers/${supplier}/products/${product}`);
}

export default {
  products,
  getProductById
};
