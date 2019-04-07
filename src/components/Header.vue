<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated slower slideInDown"
    leave-active-class="animated slower slideOutUp"
    mode="out-in"
    appear
  >
    <nav v-if="loggedIn" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">STOCKTRADER</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/stocks" tag="li" active-class="active"
            ><a class="nav-link" href="#">STOCKS</a></router-link
          >
          <router-link to="/portfolio" tag="li" active-class="active"
            ><a class="nav-link" href="#">PORTFOLIO</a></router-link
          >
        </ul>

        <button
          type="button"
          class="btn btn-outline-light btn-sm"
          @click="reloadStocks"
        >
          <span
            v-if="!dataLoaded"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {{ dataLoaded ? "REFRESH" : "LOADING" }}
        </button>
        <div class="dropdown show pl-2 pr-2">
          <button
            @click="opened = !opened"
            type="button"
            class="btn btn-outline-light btn-sm "
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            PROFILE ▾
          </button>

          <div
            v-if="opened"
            class="dropdown-menu d-block"
            aria-labelledby="dropdownMenuLink"
          >
            <button @click="exportData" class="dropdown-item">
              SAVE PROFILE
            </button>
            <button @click="logout" class="dropdown-item">
              LOG OUT
            </button>
          </div>
        </div>
      </div>
      <div class="text-white pr-2">FUNDS: {{ funds | currency }}</div>
    </nav>
  </transition>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      opened: false
    };
  },
  methods: {
    ...mapActions({
      reloadStocks: "initStocks",
      logoutAction: "logout"
    }),
    logout() {
      this.logoutAction();
      this.opened = false;
    },
    exportData() {
      const profile = {
        funds: this.funds,
        portfolio: this.stocksPortfolio
      };
      axios
        .put(`/${this.userId}.json?auth=${this.$store.getters.token}`, profile)
        .then((this.opened = false))
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters([
      "funds",
      "stocksPortfolio",
      "loggedIn",
      "userId",
      "dataLoaded"
    ])
  }
};
</script>

<style>
@-webkit-keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInDown {
  -webkit-animation-name: slideInDown;
  animation-name: slideInDown;
}

@-webkit-keyframes slideOutUp {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes slideOutUp {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

.slideOutUp {
  -webkit-animation-name: slideOutUp;
  animation-name: slideOutUp;
}
</style>
