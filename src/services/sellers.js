const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;

export function addProduct(seller, productId) {
  return axios.post(
    `${baseUrl}/api/sellers/${seller}/products/${productId}/add`
  );
}
export default {
  addProduct
};
