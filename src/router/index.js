import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/home/home.vue";
import UserView from "@/pages/user/user.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user",
      name: "user",
      component: UserView,
    },
  ],
});

export default router;
