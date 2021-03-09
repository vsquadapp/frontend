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

export function orders(user_id, params) {
  return axios.get(`${baseUrl}/api/admin/${user_id}/orders`, { params });
}

export function markOrderAsPaid(order_id) {
  return axios.post(`${baseUrl}/api/admin/orders/${order_id}/paid`);
}

export default {
  dashboard,
  suppliers,
  sellers,
  orders,
  markOrderAsPaid
};
