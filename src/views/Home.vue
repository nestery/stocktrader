<template>
  <div class="h-100 position-relative">
    <div
      v-if="loggedIn"
      class="d-flex justify-content-between flex-wrap align-items-center h-100"
    >
      <div class="col-sm-12 mb-4 text-center">
        <h3>NAVIGATE TO STOCKS MENU TO START TRADE</h3>
        <h5>YOU CAN SAVE AND LOAD DATA AT THE ANY MOMENT</h5>
        <h5>GOOD LUCK!</h5>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-content-between flex-wrap align-items-center h-100"
    >
      <div class="col-sm-12 col-md-8 mb-4 text-center">
        <h1>WELCOME TO STOCKTRADER</h1>
        <h5>SIMPLE STOCK TRADING SIMULATOR</h5>
        <h6>LOG IN TO START</h6>
      </div>
      <form
        v-if="!loggedIn"
        class="border border-secondary rounded p-5 col-sm-12 col-md-4 shadow"
        :class="{
          'border border-danger animated fast shake': loginFail
        }"
      >
        <h2 class="mb-5 text-center">LOG IN</h2>
        <h6 v-if="loginFail" class="text-danger text-center">
          Invalid email or password
        </h6>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            :class="{
              'border border-danger': loginFail
            }"
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            autocomplete="username email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            :class="{ 'border border-danger': loginFail }"
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            required
            autocomplete="current-password"
          />
          <small @click="modalOpened = true" id="openReg" class="form-text"
            >Create new account</small
          >
        </div>
        <button
          :disabled="!filledUp"
          @click.prevent="logIn"
          type="submit"
          class="btn btn-info mt-3 col-sm-6 offset-sm-3"
        >
          LOG IN
        </button>
      </form>
    </div>
    <transition
      name="custom-classes-transition-2"
      enter-active-class="animated  fadeIn"
      leave-active-class="animated  fadeOut"
    >
      <app-signup
        v-if="modalOpened"
        @closeModal="modalOpened = false"
        :modalOpened="modalOpened"
      ></app-signup>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Signup from "../components/Signup";
export default {
  data() {
    return {
      email: null,
      password: null,
      modalOpened: false
    };
  },
  methods: {
    logIn() {
      const email = this.email;
      const password = this.password;

      const data = {
        email,
        password,
        returnSecureToken: true
      };

      this.$store.dispatch("login", data);

      this.password = null;
    }
  },
  computed: {
    ...mapGetters(["loggedIn", "loginFail"]),
    filledUp() {
      return this.email && this.password;
    }
  },
  components: {
    appSignup: Signup
  }
};
</script>

<style>
#openReg {
  color: #17a2b8 !important;
  cursor: pointer;
}
#openReg:hover {
  color: #007bff !important;
}
@-webkit-keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  80% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  60% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  80% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }
  20%,
  60% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  -webkit-animation-name: shake;
  animation-name: shake;
}

.fast {
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
}
</style>
