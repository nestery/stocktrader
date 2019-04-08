import { SET_STOCKS } from "../mutypes";
import { stocksInstance } from "../../axios-stocks";

const state = {
  stocks: [],
  dataLoaded: false
};
const mutations = {
  [SET_STOCKS](state, stocks) {
    state.stocks = stocks;
  }
};
const actions = {
  buyStock({ commit }, order) {
    commit("BUY_STOCK", order);
  },
  initStocks({ commit, dispatch }) {
    state.dataLoaded = false;
    stocksInstance
      .get()
      .then(res => {
        if (res.data.length > 0) {
          return res.data;
        } else {
          dispatch("initStocks");
          throw new Error("Fetching failed, retrying...");
        }
      })
      .then(data => {
        return data;
      })
      .then(stocks => {
        commit("SET_STOCKS", stocks);
      })
      .then(() => {
        state.dataLoaded = true;
      });
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
