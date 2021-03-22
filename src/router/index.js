import { createRouter, createWebHashHistory } from "vue-router";
import SupplierTemplate from "./../template/supplier/Template";
import AdminTemplate from "./../template/admin/Template";
import SellerTemplate from "./../template/seller/Template";
import StoreTemplate from "./../template/store/Template";

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
    path: "/admin/login",
    props: true,
    name: "Admin.Login",
    component: () =>
      import(/* webpackChunkName: "auth-login" */ "../views/admin/login")
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
      },
      {
        path: "setup",
        meta: { requiresAuth: true },
        name: "Supplier.Setup",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "supplier-setup" */ "../views/supplier/setup"
          )
      },
      {
        path: "sellers/list",
        meta: { requiresAuth: true },
        name: "Supplier.ListSellers",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "supplier-sellers-list" */ "../views/supplier/sellers/list"
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
      },
      {
        path: "setup",
        meta: { requiresAuth: true },
        name: "Seller.Setup",
        props: true,
        component: () =>
          import(/* webpackChunkName: "seller-setup" */ "../views/seller/setup")
      }
    ]
  },
  {
    path: "/admin",
    component: AdminTemplate,
    redirect: { name: "AdminLogin" },
    children: [
      {
        path: "dashboard",
        meta: { requiresAuth: true },
        name: "Admin.Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "admin-dashboard" */ "../views/admin/dashboard"
          )
      },
      {
        path: "suppliers",
        meta: { requiresAuth: true },
        name: "Admin.SuppliersList",
        component: () =>
          import(
            /* webpackChunkName: "admin-suppliers-list" */ "../views/admin/suppliers/list"
          )
      },
      {
        path: "suppliers/:supplier_id/details",
        meta: { requiresAuth: true },
        props: true,
        name: "Admin.SuppliersDetails",
        component: () =>
          import(
            /* webpackChunkName: "admin-suppliers-details" */ "../views/admin/suppliers/details"
          )
      },
      {
        path: "sellers",
        meta: { requiresAuth: true },
        name: "Admin.SellersList",
        component: () =>
          import(
            /* webpackChunkName: "admin-sellers-list" */ "../views/admin/sellers/list"
          )
      },
      {
        path: "sellers/:seller_id/details",
        meta: { requiresAuth: true },
        props: true,
        name: "Admin.sellersDetails",
        component: () =>
          import(
            /* webpackChunkName: "admin-sellers-details" */ "../views/admin/sellers/details"
          )
      },
      {
        path: "orders",
        meta: { requiresAuth: true },
        name: "Admin.OrdersList",
        component: () =>
          import(
            /* webpackChunkName: "admin-orders-list" */ "../views/admin/orders/list"
          )
      }
    ]
  },
  {
    path: "/store/:slug",
    name: "Store",
    component: StoreTemplate,
    props: true,
    redirect: { name: "Store.Home" },
    children: [
      {
        path: "",
        name: "Store.Home",
        props: true,
        component: () =>
          import(/* webpackChunkName: "seller-shop" */ "../views/store/home")
      },
      {
        path: "product/:id",
        name: "Store.Product.Details",
        props: true,
        component: () =>
          import(/* webpackChunkName: "seller-shop" */ "../views/store/product")
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
