<template>
  <div class="card bg-light mb-3 shadow-sm">
    <div class="card-header">
      <h5 class="mb-0">{{ stock.id }}</h5>
      <small class="text-muted font-weight-lighter p-0 mt-0 mb-2 d-block">{{
        stock.name
      }}</small>
      <small>Price: {{ stock.price | currency }}</small>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between pb-1">
        <h6 class="card-title mb-0">BUY STOCK</h6>
        <small
          class="float-right pl-1 pr-1"
          :class="{
            'd-none': !quantity,
            'bg-danger text-white rounded': quantity > maxStocks
          }"
          >SUBTOTAL: {{ subtotal | currency }}</small
        >
      </div>
      <div class="input-group mb-3">
        <input
          v-model="quantity"
          type="number"
          class="form-control"
          min="1"
          :max="maxStocks"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            @click="buyStock"
            :disabled="
              quantity <= 0 || subtotal > funds || !Number.isInteger(+quantity)
            "
            type="button"
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      quantity: 0
    };
  },
  props: ["stock"],
  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockName: this.stock.name,
        stockPrice: +this.stock.price,
        quantity: +this.quantity
      };
      this.$store.dispatch("buyStock", order);

      this.quantity = 0;
    }
  },
  computed: {
    ...mapGetters(["funds"]),
    subtotal() {
      return this.quantity * this.stock.price;
    },
    maxStocks() {
      return Math.floor(this.funds / this.stock.price);
    }
  }
};
</script>

<style></style>
