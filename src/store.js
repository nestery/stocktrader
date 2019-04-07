import Vue from "vue";
import Vuex from "vuex";
import stocks from "./store/modules/stocks";
import portfolio from "./store/modules/portfolio";
import auth from "./store/modules/auth";
import * as actions from "./store/modules/actions";

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    stocks,
    portfolio,
    auth
  }
});
