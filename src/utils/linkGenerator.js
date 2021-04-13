export default {
  getProductLink(productId, storeName) {
    return `${window.location.origin}/store/${storeName}/product/${productId}`;
  }
};
