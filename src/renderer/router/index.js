import Vue from "vue";
import Router from "vue-router";
import helper from "../helper/helper";
const storage = require("electron-json-storage");
const si = require("systeminformation");
const crypto = require("crypto");

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
      path: "/token",
      name: "Token",
      component: require("@/components/Token/Token")
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
    storage.has("auth-config", (error, hasKey) => {
      if (hasKey) {
        storage.get("auth-config", (error, data) => {
          const authConfig = data;
          if (!authConfig.user) {
            next({
              name: "Login"
            });
          } else {
            if (!authConfig.token) {
              next({
                name: "Token"
              });
            } else {
              const serialNum = helper.getSerinumDisk();
              if (helper.hash(serialNum, authConfig.token) == authConfig.hashToken) {
                next({
                  name: "Translate"
                });
              } else {
                next();
              }
            }
          }
        });
      } else {
        next({
          name: "Login"
        });
      }
    });
  } else {
    next();
  }
});

export default router;

export { router };
