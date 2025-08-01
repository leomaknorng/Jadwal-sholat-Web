// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "./layout/utama.vue";
import Beranda from "./menu/dasboardContent.vue";

const routes = [
  {
    path: "",
    name: "utama",
    component: Layout,
    children: [
      {
        path: "",
        name: "beranda",
        component: Beranda,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
