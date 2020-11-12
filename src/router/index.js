import { createRouter, createWebHashHistory } from "vue-router";
import SupplierTemplate from "./../template/supplier/Template";
import SellerTemplate from "./../template/seller/Template";

const routes = [
  {
    path: "",
    name: "Home",
    component: () => import(/* webpackChunkName: "about" */ "../views/home")
  },
  {
    path: "/login/:userType",
    props: true,
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/login")
  },
  {
    path: "/recovery-password/:userType",
    props: true,
    name: "RecoveryPassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/recovery-password")
  },
  {
    path: "/supplier/register",
    name: "Supplier.Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/supplier/register")
  },
  {
    path: "/supplier",
    component: SupplierTemplate,
    redirect: { name: "Login", params: { userType: "supplier" } },
    children: [
      {
        path: "dashboard",
        name: "Supplier.Dashboard",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/supplier/dashboard")
      },
      {
        path: "product/create",
        name: "Supplier.CreateProduct",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/supplier/product/create"
          )
      },
      {
        path: "product/list",
        name: "Supplier.ListProduct",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/supplier/product/list"
          )
      },
      {
        path: "product/edit/:id",
        name: "Supplier.EditProduct",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/supplier/product/edit"
          )
      },
      {
        path: "orders",
        name: "Supplier.ListOrders",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/supplier/order/list")
      },
      {
        path: "sales",
        name: "Supplier.ListSales",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/supplier/sale/list")
      }
    ]
  },
  {
    path: "/seller/register",
    name: "Seller.Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/seller/register")
  },
  {
    path: "/seller",
    component: SellerTemplate,
    redirect: { name: "Login", params: { userType: "seller" } },
    children: [
      {
        path: "dashboard",
        name: "Seller.Dashboard",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/seller/dashboard")
      },
      {
        path: "product/list",
        name: "Seller.ListProduct",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/seller/product/list")
      },
      {
        path: "product/:id",
        name: "Seller.ViewProduct",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/seller/product/view")
      },
      {
        path: "stores",
        name: "Seller.Stores",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/seller/stores/index")
      },
      {
        path: "stores/:id",
        name: "Seller.StoreProducts",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/seller/stores/products"
          )
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
