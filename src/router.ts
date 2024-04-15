import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Main from "./components/Main.vue";
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/login', component: Login },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get("AuthToken");
  console.log(isAuthenticated);

  if (to.path !== '/login' && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
