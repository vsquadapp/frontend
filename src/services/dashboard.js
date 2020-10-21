export function loadProductsInfo() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("27");
    }, 2000);
  });
}
export function loadSellersInfo() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("5");
    }, 2000);
  });
}
export function loadSalesInfo() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("10");
    }, 2000);
  });
}
export function loadOrdersInfo() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("2");
    }, 2000);
  });
}

export default {
  loadProductsInfo,
  loadSellersInfo,
  loadSalesInfo,
  loadOrdersInfo
};
