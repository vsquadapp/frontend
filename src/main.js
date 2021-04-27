import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";

import store from "./store";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

require("bootstrap");
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import Maska from "maska";

createApp(App)
  .use(store)
  .use(router)
  .use(VueSweetalert2)
  .use(Maska)
  .mount("#app");
