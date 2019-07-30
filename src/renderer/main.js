import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";
import App from "./App";
import router from "./router";
import store from "./store";
import ApiService from "./services/Api";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
ApiService.init("http://translate.io/");
Vue.use(Toaster, {
  timeout: 4000
});
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
