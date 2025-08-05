// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Welcome from "./layout/welcome.vue";
import Layout from "./layout/utama.vue";
import Alquran from "./layout/alquran.vue";

import Beranda from "./menu/dasboardContent.vue";
import Jadwal from "./menu/jadwal.vue";
import Quran from "./menu/quran.vue";
const routes = [
  {
    path: "/",
    name: "welcome",
    component: Welcome,
    children: [
      {
        path: "",
        name: "beranda",
        component: Beranda,
      },
    ],
  },
  {
    path: "/",
    name: "utama",
    component: Layout,
    children: [
      {
        path: "jadwal",
        name: "jadwal",
        component: Jadwal,
      },
    ],
  },
  {
    path: "/",
    name: "alquran",
    component: Alquran,
    children: [
      {
        path: "quran",
        name: "quran",
        component: Quran,
      },
      {
        path: "alquran/:nomor", // untuk detail surah
        name: "alquran-detail",
        component: () => import("@/menu/quran_detail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
