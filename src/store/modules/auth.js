import { authInstance as axiosAuth } from "../../axios-auth";
import axios from "axios";
import { AUTH_USER, LOGOUT_USER } from "../mutypes";
import router from "../../router";

const state = {
  idToken: null,
  userId: null,
  loggedIn: false,
  loginFail: false,
  emailExists: false
};
const mutations = {
  [AUTH_USER](state, authData) {
    state.idToken = authData.idToken;
    state.userId = authData.localId;
  },
  [LOGOUT_USER](state) {
    state.idToken = null;
    state.userId = null;
    state.regSuccess = false;
    state.loggedIn = false;
  }
};
const actions = {
  tryAutoLogin({ commit, dispatch }) {
    const idToken = localStorage.getItem("token");
    if (!idToken) {
      return;
    }

    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const now = new Date();
    if (now > expirationDate) {
      dispatch("logout");
      return;
    }
    const localId = localStorage.getItem("userId");
    const data = {
      idToken,
      localId
    };

    commit("AUTH_USER", data);
    dispatch("loadData");
    state.loggedIn = true;
  },
  logout({ commit }) {
    commit("LOGOUT_USER");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.replace("/");
  },
  setLogoutTimer({ dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch("logout");
    }, expirationTime * 1000);
  },
  signup({ commit, dispatch }, userData) {
    return axiosAuth
      .post(
        "/signupNewUser?key=AIzaSyAwx6VAthJtv2WyZhz5o2V7zuPCtyuIdZo",
        userData
      )
      .then(res => {
        if (res.status === 200 && res.data.idToken) {
          state.regSuccess = true;
          commit("AUTH_USER", res.data);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch("setLogoutTimer", res.data.expiresIn);
          return res.data;
        }
      })
      .then(res => {
        const profile = {
          funds: 10000
        };

        return axios
          .put(`/${res.localId}.json?auth=${res.idToken}`, profile)
          .catch(err => {
            console.log(err);
          });
      })
      .then(() => {
        return dispatch("loadData");
      })
      .then(() => {
        state.loggedIn = true;
        router.replace("/");
      })
      .catch(err => {
        if (err.response.data.error.message === "EMAIL_EXISTS") {
          state.emailExists = true;
          setTimeout(() => {
            state.emailExists = false;
          }, 5000);
        }
        console.log(err);
      });
  },
  login({ commit, state, dispatch }, userData) {
    state.loginFail = false;
    axiosAuth
      .post(
        "/verifyPassword?key=AIzaSyAwx6VAthJtv2WyZhz5o2V7zuPCtyuIdZo",
        userData
      )
      .then(res => {
        if (res.status === 200 && res.data.idToken) {
          commit("AUTH_USER", res.data);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);

          dispatch("setLogoutTimer", res.data.expiresIn);
        }
      })
      .then(() => {
        return dispatch("loadData");
      })
      .then(() => {
        state.loggedIn = true;
      })
      .catch(err => {
        if (err.status === 400) {
          state.loginFail = true;
          setTimeout(() => {
            state.loginFail = false;
          }, 5000);
        }
        console.log(err);
      });
  }
};
const getters = {
  userId(state) {
    return state.userId;
  },
  loggedIn(state) {
    return state.loggedIn;
  },
  token(state) {
    return state.idToken;
  },
  loginFail(state) {
    return state.loginFail;
  },
  emailExists(state) {
    return state.emailExists;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
