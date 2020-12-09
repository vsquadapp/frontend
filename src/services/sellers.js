const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function addProduct(seller, productId) {
  return axios.post(
    `${baseUrl}/api/sellers/${seller}/products/${productId}/add`
  );
}

export function products(seller, page = 1, items = 15) {
  return axios.get(
    `${baseUrl}/api/sellers/${seller}/products?page=${page}&items=${items}`
  );
}

export default {
  addProduct,
  products
};
