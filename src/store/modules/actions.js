import store from "../../store";
import axios from "axios";
export function loadData({ commit }) {
  return new Promise((resolve, reject) => {
    axios
      .get(`/${store.getters.userId}.json?auth=${store.getters.token}`)
      .then(res => {
        if (res.data) {
          return res.data;
        } else {
          console.log("Profile data is empty");
        }
      })
      .then(data => {
        const funds = data.funds;
        const stocksPortfolio = data.portfolio ? data.portfolio : [];
        const profile = {
          funds,
          stocksPortfolio
        };
        commit("SET_PORTFOLIO", profile);
        resolve();
      })
      .catch(err => {
        reject(`Error from action module${err}`);
      });
  });
}
