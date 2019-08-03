import Vue from "vue";
import Router from "vue-router";
import helper from "../helper/helper";
const config = require("electron-json-config");

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

router.beforeEach(async (to, from, next) => {
  // Check route require auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authConfig = config.get("auth-config");
    if (typeof authConfig == "undefined") {
      next({
        name: "Login"
      });
    } else {
      if (!authConfig.user) {
        next({
          name: "Login"
        });
      } else {
        if (typeof authConfig.token == "undefined") {
          next({
            name: "Token"
          });
        } else {
          const disk = await helper.getDiskLayout();
          const serialNum = disk[0].serialNum;
          if (
            helper.md5(serialNum + authConfig.token) == authConfig.hashToken
          ) {
            next();
          } else {
            next({
              name: "Login"
            });
          }
        }
      }
    }
  } else {
    next();
  }
});

export default router;

export { router };
