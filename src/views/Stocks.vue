<template>
  <div class="d-flex flex-column justify-content-center position-relative pt-5">
    <div
      v-if="!dataLoaded"
      class="spinner-border position-fixed spinner-fixed"
      style="width: 3rem; height: 3rem;"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="col-sm-12 card-columns">
      <app-stock
        v-for="stock in stocks"
        :key="stock.Symbol"
        :stock="stock"
      ></app-stock>
    </div>
  </div>
</template>

<script>
import Stock from "../components/stocks/Stock";
import { mapGetters } from "vuex";
export default {
  components: {
    appStock: Stock
  },
  computed: {
    ...mapGetters(["dataLoaded", "stocks"])
  }
};
</script>

<style>
.spinner-fixed {
  top: 50%;
  left: 45%;
}
</style>
