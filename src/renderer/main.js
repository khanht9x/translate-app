import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import App from "./App";
import router from "./router";
import store from "./store";
import ApiService from "./services/Api";
import config from "./configs/config"

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
ApiService.init(config.baseURL);
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
