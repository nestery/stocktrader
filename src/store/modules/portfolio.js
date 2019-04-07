import { BUY_STOCK, SELL_STOCK, SET_PORTFOLIO } from "../mutypes";

const state = {
  funds: 0,
  stocks: []
};
const mutations = {
  [BUY_STOCK](state, { stockId, stockName, stockPrice, quantity }) {
    const record = state.stocks.find(stock => stock.id === stockId);
    if (stockPrice * quantity > state.funds) {
      throw new Error("You don't have enouth funds");
    }
    if (record) {
      record.quantity += quantity;
    } else {
      state.stocks.push({
        id: stockId,
        name: stockName,
        quantity: quantity,
        buyCost: stockPrice
      });
    }
    state.funds -= stockPrice * quantity;
  },
  [SELL_STOCK](state, { stockId, stockPrice, quantity }) {
    const record = state.stocks.find(stock => stock.id === stockId);
    if (record.quantity > quantity) {
      record.quantity -= quantity;
    } else if (record.quantity === quantity) {
      const stock = state.stocks.indexOf(record);
      state.stocks.splice(stock, 1);
    } else {
      throw new Error("You don't have enouth stocks");
    }
    state.funds += stockPrice * quantity;
  },
  [SET_PORTFOLIO](state, portfolio) {
    state.funds = portfolio.funds;
    state.stocks = portfolio.stocksPortfolio;
  }
};
const actions = {
  sellStock({ commit }, order) {
    commit("SELL_STOCK", order);
  }
};
const getters = {
  funds(state) {
    return state.funds;
  },
  stocksPortfolio(state, getters) {
    return state.stocks.map(stock => {
      const record = getters.stocks.find(elem => elem.id === stock.id);
      return {
        id: stock.id,
        name: record.name,
        price: +record.price,
        quantity: +stock.quantity,
        buyCost: +stock.buyCost
      };
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
