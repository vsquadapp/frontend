import { createRouter, createWebHashHistory } from "vue-router";
import SupplierTemplate from "./../template/supplier/Template";
import SellerTemplate from "./../template/seller/Template";

import store from "@/store";

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next();
//     return;
//   }
//   next("/");
// };

const routes = [
  {
    path: "",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/home")
  },
  {
    path: "/login/:userType",
    props: true,
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "auth-login" */ "../views/login")
  },
  {
    path: "/recovery-password/:userType",
    props: true,
    name: "RecoveryPassword",
    component: () =>
      import(
        /* webpackChunkName: "auth-reset-password" */ "../views/recovery-password"
      )
  },
  {
    path: "/supplier/register",
    name: "Supplier.Register",
    component: () =>
      import(
        /* webpackChunkName: "supplier-register" */ "../views/supplier/register"
      )
  },
  {
    path: "/supplier",
    component: SupplierTemplate,
    redirect: { name: "Login", params: { userType: "supplier" } },
    children: [
      {
        path: "dashboard",
        meta: { requiresAuth: true },
        name: "Supplier.Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "supplier-dashboard" */ "../views/supplier/dashboard"
          )
      },
      {
        path: "product/create",
        meta: { requiresAuth: true },
        name: "Supplier.CreateProduct",
        component: () =>
          import(
            /* webpackChunkName: "supplier-create-product" */ "../views/supplier/product/create"
          )
      },
      {
        path: "product/list",
        meta: { requiresAuth: true },
        name: "Supplier.ListProduct",
        component: () =>
          import(
            /* webpackChunkName: "supplier-list-products" */ "../views/supplier/product/list"
          )
      },
      {
        path: "product/edit/:id",
        meta: { requiresAuth: true },
        name: "Supplier.EditProduct",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "supplier-edit-product" */ "../views/supplier/product/edit"
          )
      },
      {
        path: "orders",
        meta: { requiresAuth: true },
        name: "Supplier.ListOrders",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "supplier-list-orders" */ "../views/supplier/order/list"
          )
      },
      {
        path: "sales",
        meta: { requiresAuth: true },
        name: "Supplier.ListSales",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "supplier-list-sales" */ "../views/supplier/sale/list"
          )
      }
    ]
  },
  {
    path: "/seller/register",
    name: "Seller.Register",
    component: () =>
      import(
        /* webpackChunkName: "seller-register" */ "../views/seller/register"
      )
  },
  {
    path: "/seller",
    component: SellerTemplate,
    redirect: { name: "Login", params: { userType: "seller" } },
    children: [
      {
        path: "dashboard",
        meta: { requiresAuth: true },
        name: "Seller.Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "seller-dashboard" */ "../views/seller/dashboard"
          )
      },
      {
        path: "catalog",
        meta: { requiresAuth: true },
        name: "Seller.Catalog",
        component: () =>
          import(
            /* webpackChunkName: "seller-catalog" */ "../views/seller/catalog"
          )
      },
      {
        path: "product/list",
        meta: { requiresAuth: true },
        name: "Seller.ListProduct",
        component: () =>
          import(
            /* webpackChunkName: "seller-list-products" */ "../views/seller/product/list"
          )
      },
      {
        path: "product/:id",
        meta: { requiresAuth: true },
        name: "Seller.ViewProduct",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "seller-view-product" */ "../views/seller/product/view"
          )
      },
      {
        path: "stores",
        meta: { requiresAuth: true },
        name: "Seller.Stores",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "seller-list-stores" */ "../views/seller/stores/index"
          )
      },
      {
        path: "stores/:id",
        meta: { requiresAuth: true },
        name: "Seller.StoreProducts",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "seller-store-products" */ "../views/seller/stores/products"
          )
      },
      {
        path: "orders",
        meta: { requiresAuth: true },
        name: "Seller.ListOrders",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "seller-list-orders" */ "../views/seller/order/list"
          )
      },
      {
        path: "sales",
        meta: { requiresAuth: true },
        name: "Seller.ListSales",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "seller-list-sales" */ "../views/seller/sale/list"
          )
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next({ name: "Home", params: { unauthorized: true } });
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    return ifAuthenticated(to, from, next);
  }
  next();
});

export default router;
