<template>
  <div class="d-flex flex-column justify-content-center pt-5">
    <transition
      name="custom-classes-transition-1"
      enter-active-class="animated slower fadeIn"
      leave-active-class="animated fadeOut"
    >
      <h5
        v-if="isEmpty"
        class="text-center p-5 border border-secondary rounded shadow"
      >
        YOUR PORTFOLIO IS EMPTY
      </h5>
    </transition>
    <div class="card-columns">
      <transition-group
        name="custom-classes-transition-2"
        enter-active-class="animated faster fadeInDown"
        leave-active-class="animated faster fadeOutUp"
        mode="out-in"
      >
        <app-stock
          v-for="stock in stocks"
          :key="stock.id"
          :stock="stock"
        ></app-stock>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Stock from "../components/portfolio/Stock";
import { mapGetters } from "vuex";

export default {
  components: {
    appStock: Stock
  },
  computed: {
    ...mapGetters({ stocks: "stocksPortfolio" }),
    isEmpty() {
      return this.stocks.length === 0;
    }
  }
};
</script>

<style></style>
