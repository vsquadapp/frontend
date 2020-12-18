const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function getById(productId) {
  return axios.get(`${baseUrl}/api/products/${productId}`);
}

export function categories(page = 1, items = 15) {
  return axios.get(`${baseUrl}/api/categories?items=${items}&page=${page}`);
}

export function index(items = 15, page = 1, category_id = "") {
  return axios.get(
    `${baseUrl}/api/products?items=${items}&page=${page}&category_id=${category_id}`
  );
}

export function create(data) {
  return axios.post(`${baseUrl}/api/products`, data);
}

export function update(product_id, data) {
  return axios.patch(`${baseUrl}/api/products/${product_id}`, data);
}

export function destroy(product_id) {
  return axios.delete(`${baseUrl}/api/products/${product_id}`);
}

export default {
  index,
  getById,
  categories,
  create,
  update,
  destroy
};
