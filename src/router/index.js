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
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
