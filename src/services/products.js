const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function getById(productId) {
  return axios.get(`${baseUrl}/api/products/${productId}`);
}

export function index(items = 15, page = 1) {
  return axios.get(`${baseUrl}/api/products?items=${items}&page=${page}`);
}

export function create(data) {
  return axios.post(`${baseUrl}/api/products`, data);
}

export default {
  index,
  getById,
  create
};
