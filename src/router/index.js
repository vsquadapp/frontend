import { createRouter, createWebHashHistory } from "vue-router";
import Template from "./../template/Template";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/login")
  },
  {
    path: "/recovery-password",
    name: "RecoveryPassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/recovery-password")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "about" */ "../views/register")
  },
  {
    path: "/",
    component: Template,
    redirect: { name: "Login" },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/dashboard")
      },
      {
        path: "/product/create",
        name: "CreateProduct",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/product/create")
      },
      {
        path: "/product/list",
        name: "ListProduct",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/product/list")
      },
      {
        path: "/product/edit/:id",
        name: "EditProduct",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/product/edit")
      },
      {
        path: "/orders",
        name: "ListOrders",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/order/list")
      },
      {
        path: "/sales",
        name: "ListSales",
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/sale/list")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
