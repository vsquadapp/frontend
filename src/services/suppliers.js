const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function products(supplier, page, category_id) {
  return axios.get(
    `${baseUrl}/api/suppliers/${supplier}/products?page=${page}&category_id=${category_id}`
  );
}

export function categories(supplier, page, items) {
  return axios.get(
    `${baseUrl}/api/suppliers/${supplier}/categories?page=${page}&items=${items}`
  );
}

export function getProductById(supplier, product) {
  return axios.get(`${baseUrl}/api/suppliers/${supplier}/products/${product}`);
}

export function dashboard(supplier) {
  return axios.get(`${baseUrl}/api/suppliers/${supplier}/dashboard`);
}

export function orders(supplier, page, items, status) {
  return axios.get(
    `${baseUrl}/api/suppliers/${supplier}/orders?page=${page}&items=${items}&status=${status}`
  );
}

export default {
  products,
  categories,
  getProductById,
  dashboard,
  orders
};
