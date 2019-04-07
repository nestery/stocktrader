import { SET_STOCKS, RND_STOCKS } from "../mutypes";
import { stocksInstance } from "../../axios-stocks";

const state = {
  stocks: [],
  dataLoaded: false
};
const mutations = {
  [SET_STOCKS](state, stocks) {
    state.stocks = stocks;
  },
  [RND_STOCKS]() {
    state.stocks.forEach(stock => {
      stock.price = stock.price * (Math.random() * (1.045 - 0.95) + 0.95);
    });
  }
};
const actions = {
  buyStock({ commit }, order) {
    commit("BUY_STOCK", order);
  },
  initStocks({ commit }) {
    state.dataLoaded = false;
    stocksInstance
      .get()
      .then(res => {
        return res.data;
      })
      .then(data => {
        let stocks = data.map(stock => {
          return {
            id: stock.Symbol,
            name: stock.Name,
            price: +stock.lastsale
          };
        });
        return stocks;
      })
      .then(stocks => {
        commit("SET_STOCKS", stocks);
      })
      .then(() => {
        state.dataLoaded = true;
      });
  },
  randomizeStocks({ commit }) {
    commit("RND_STOCKS");
  }
};
const getters = {
  stocks(state) {
    return state.stocks;
  },
  dataLoaded(state) {
    return state.dataLoaded;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
