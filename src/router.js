import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/portfolio",
      name: "portfolio",
      beforeEnter(to, from, next) {
        if (store.state.auth.idToken) {
          next();
        } else {
          next("/");
        }
      },
      component: () =>
        import(/* webpackChunkName: "Portfolio" */ "./views/Portfolio.vue")
    },
    {
      path: "/stocks",
      name: "stocks",
      beforeEnter(to, from, next) {
        if (store.state.auth.idToken) {
          next();
        } else {
          next("/");
        }
      },
      component: () =>
        import(/* webpackChunkName: "Stocks" */ "./views/Stocks.vue")
    }
  ]
});
