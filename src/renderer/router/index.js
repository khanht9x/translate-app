import Vue from "vue";
import Router from "vue-router";
const storage = require("electron-json-storage");

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/",
      name: "Translate",
      component: require("@/components/Translate/Translate"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: require("@/components/Auth/Login")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Check route require auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (typeof storage.get("auth-config") == "undefined") {
      console.log(1);
      next({
        name: "Login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

export { router };
