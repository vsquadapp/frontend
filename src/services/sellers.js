const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function addProduct(seller, productId) {
  return axios.post(
    `${baseUrl}/api/sellers/${seller}/products/${productId}/add`
  );
}

export function removeProduct(seller, productId) {
  return axios.post(
    `${baseUrl}/api/sellers/${seller}/products/${productId}/remove`
  );
}

export function categories(seller, page = 1, items = 15) {
  return axios.get(
    `${baseUrl}/api/sellers/${seller}/categories?page=${page}&items=${items}`
  );
}

export function products(seller, page = 1, items = 15, category_id = "") {
  return axios.get(
    `${baseUrl}/api/sellers/${seller}/products?page=${page}&items=${items}&category_id=${category_id}`
  );
}

export function dashboard(seller) {
  return axios.get(`${baseUrl}/api/sellers/${seller}/dashboard`);
}

export function findSellerBySlug(slug) {
  return axios.get(`${baseUrl}/api/sellers/slug/${slug}`).then(response => {
    if (response.data) {
      return response.data;
    } else {
      throw "vendedor não encontrado";
    }
  });
}

export function orders(seller, page, items, status) {
  return axios.get(
    `${baseUrl}/api/sellers/${seller}/orders?page=${page}&items=${items}&status=${status}`
  );
}

export function update(seller, data) {
  return axios.put(`${baseUrl}/api/sellers/${seller}`, data);
}

export default {
  addProduct,
  removeProduct,
  categories,
  products,
  dashboard,
  findSellerBySlug,
  orders,
  update
};
