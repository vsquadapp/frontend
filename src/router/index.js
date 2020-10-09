import { createRouter, createWebHashHistory } from "vue-router";
import Template from "./../template/Template";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "about" */ "../views/login")
  },
  {
    path: "/",
    component: Template,
    redirect: { name: "Dashboard" },
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
