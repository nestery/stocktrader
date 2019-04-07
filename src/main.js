import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

axios.defaults.baseURL = "https://appstocktrader.firebaseio.com/";
axios.defaults.headers.common["Content-Type"] = "application/json";

Vue.config.productionTip = false;

Vue.filter("currency", value => {
  return `$${value.toFixed(2)}`;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
