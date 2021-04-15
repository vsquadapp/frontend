const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function dashboard(user_id) {
  return axios.get(`${baseUrl}/api/admin/${user_id}/dashboard`);
}

export function suppliers(user_id, params) {
  return axios.get(`${baseUrl}/api/admin/${user_id}/suppliers`, { params });
}

export function sellers(user_id, params) {
  return axios.get(`${baseUrl}/api/admin/${user_id}/sellers`, { params });
}

export function products(user_id, params) {
  return axios.get(`${baseUrl}/api/admin/${user_id}/products`, { params });
}

export function orders(user_id, params) {
  return axios.get(`${baseUrl}/api/admin/${user_id}/orders`, { params });
}

export function markOrderAsPaid(order_id) {
  return axios.post(`${baseUrl}/api/admin/orders/${order_id}/paid`);
}

export function sellerById(seller_id) {
  return axios.get(`${baseUrl}/api/admin/sellers/${seller_id}`);
}

export function supplerById(supplier_id) {
  return axios.get(`${baseUrl}/api/admin/suppliers/${supplier_id}`);
}

export function verifySupplier(supplier_id) {
  return axios.post(`${baseUrl}/api/suppliers/${supplier_id}/verify`);
}

export function verifySeller(seller_id) {
  return axios.post(`${baseUrl}/api/sellers/${seller_id}/verify`);
}

export function removeProduct(product_id) {
  return axios.delete(`${baseUrl}/api/admin/products/${product_id}`);
}

export default {
  dashboard,
  suppliers,
  sellers,
  orders,
  products,
  markOrderAsPaid,
  sellerById,
  supplerById,
  verifySupplier,
  verifySeller,
  removeProduct
};
