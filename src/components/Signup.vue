<template>
  <div class="fixed-top bg-black-translucent h-100 d-flex align-items-center">
    <form
      class="border border-secondary rounded p-5 col-sm-12 col-md-4 offset-md-4 d-flex flex-column shadow bg-white position-relative"
    >
      <h2 class="mb-5 text-center">CREATE ACCOUNT</h2>
      <button
        @click="closeModal"
        type="button"
        class="close position-absolute close-btn"
      >
        <span>&times;</span>
      </button>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          v-on:blur="$v.name.$touch()"
          :class="{
            'is-invalid': $v.name.$error,
            'is-valid': !$v.name.$error && $v.name.$dirty
          }"
          v-model="name"
          type="text"
          class="form-control"
          id="inputName"
          aria-describedby="inputName"
          placeholder="Enter name"
          autocomplete="username"
        />
        <small class="text-danger" v-if="!$v.name.alpha && $v.name.$dirty"
          >Only letters are allowed in the name</small
        >
        <small class="text-danger" v-if="!$v.name.required && $v.name.$dirty"
          >Name is required</small
        >
      </div>
      <div class="form-group">
        <label for="emailInput">Email address</label>
        <input
          v-on:blur="$v.email.$touch()"
          :class="{
            'is-invalid': $v.email.$error,
            'is-valid': !$v.email.$error && $v.email.$dirty,
            'animated shake fast': emailExists
          }"
          v-model="email"
          type="email"
          class="form-control"
          id="emailInput"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          autocomplete="username"
        />
        <small class="text-danger" v-if="emailExists"
          >Email already exists</small
        >
        <small class="text-danger" v-if="!$v.email.email && $v.email.$dirty"
          >Please enter a valid email</small
        >
        <small class="text-danger" v-if="!$v.email.required && $v.email.$dirty"
          >Email is required</small
        >
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input
          v-on:blur="$v.password.$touch()"
          :class="{
            'is-invalid': $v.password.$error,
            'is-valid': !$v.password.$error && $v.password.$dirty
          }"
          v-model.trim="password"
          type="password"
          class="form-control"
          id="inputPassword"
          placeholder="Password"
          autocomplete="new-password"
        />
        <small
          class="text-danger"
          v-if="!$v.password.minLength && $v.password.$dirty"
          >Password must have at least 6 letters</small
        >
        <small
          class="text-danger"
          v-if="!$v.password.required && $v.password.$dirty"
          >Password is required</small
        >
      </div>
      <div class="form-group">
        <label for="inputrepeatPassword">Repeat password</label>
        <input
          @input="$v.repeatPassword.$touch()"
          :class="{
            'is-invalid': $v.repeatPassword.$error,
            'is-valid':
              $v.repeatPassword.sameAsPassword && $v.repeatPassword.$dirty
          }"
          v-model.trim="repeatPassword"
          type="password"
          class="form-control"
          id="inputrepeatPassword"
          placeholder="Password"
          autocomplete="new-password"
        />
        <small
          v-if="!$v.repeatPassword.sameAsPassword && $v.repeatPassword.$dirty"
          class="text-danger"
          >Passwords must be identical</small
        >
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="agree"
          id="agree"
        />
        <label class="form-check-label" for="agree">
          You agree to the Stocktrader <a href="#">Terms of Service</a>
        </label>
      </div>

      <button
        :disabled="$v.$invalid"
        @click.prevent="signUp"
        type="submit"
        class="btn btn-info mt-3 col-sm-12 col-md-4 offset-md-4"
      >
        REGISTER
      </button>
    </form>
  </div>
</template>

<script>
import {
  required,
  minLength,
  email,
  alpha,
  sameAs
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  props: ["modalOpened"],
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      agree: false
    };
  },
  methods: {
    signUp() {
      const email = this.email;
      const password = this.password;
      const name = this.name;

      const data = {
        name,
        email,
        password,
        returnSecureToken: true
      };
      this.$store.dispatch("signup", data).then(() => {
        this.$emit("closeModal");
      });
    },
    closeModal() {
      this.$emit("closeModal");
    }
  },
  computed: {
    ...mapGetters(["emailExists"])
  },
  validations: {
    email: {
      required,
      email,
      unique() {
        return !this.emailExists;
      }
    },
    name: {
      required,
      alpha
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
      minLength: minLength(6)
    },
    agree: {
      checked() {
        return this.agree;
      }
    }
  }
};
</script>

<style scoped>
.form-check-label {
  cursor: pointer !important;
}
.form-check-input {
  width: 16px;
  height: 16px;
}
.bg-black-translucent {
  background-color: rgba(0, 0, 0, 0.75);
}
.close-btn {
  top: 12px;
  right: 18px;
  outline: none;
}
</style>
