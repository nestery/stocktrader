<template>
  <div class="card bg-light mb-3 shadow-sm">
    <div class="card-header">
      <h5 class="mb-0">{{ stock.id }}</h5>
      <small class="text-muted font-weight-lighter p-0 mt-0 mb-2 d-block">{{
        stock.name
      }}</small>
      <div class="d-flex justify-content-between align-items-between">
        <div class="d-flex flex-column">
          <small
            :class="{
              'text-danger': stock.price < stock.buyCost,
              'text-success': stock.price > stock.buyCost
            }"
            >Current price: {{ currentPrice }}</small
          >
          <small>Buyed for: {{ stock.buyCost | currency }}</small>
        </div>
        <small>Quantity: {{ stock.quantity }}</small>
      </div>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-between pb-1">
        <h6 class="card-title mb-0">BUY STOCK</h6>
        <small
          class="float-right pl-1 pr-1"
          :class="{
            'd-none': !quantity
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
          :max="stock.quantity"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-info"
            @click="sellStock"
            :disabled="
              quantity <= 0 ||
                quantity > stock.quantity ||
                !Number.isInteger(+quantity)
            "
            type="button"
          >
            SELL
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      quantity: 0
    };
  },
  props: ["stock"],
  methods: {
    ...mapActions({ placeSellOrder: "sellStock" }),
    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: +this.stock.price,
        quantity: +this.quantity
      };
      this.placeSellOrder(order);

      this.quantity = 0;
    }
  },
  computed: {
    subtotal() {
      return this.quantity * this.stock.price;
    },
    currentPrice() {
      if (this.stock.price > this.stock.buyCost) {
        return `▴ $${this.stock.price.toFixed(2)} (+${(
          this.stock.price - this.stock.buyCost
        ).toFixed(2)})`;
      }
      if (this.stock.price < this.stock.buyCost) {
        return `▾ $${this.stock.price.toFixed(2)} (${(
          this.stock.price - this.stock.buyCost
        ).toFixed(2)})`;
      }
      return `$${this.stock.price.toFixed(2)}`;
    }
  }
};
</script>

<style></style>
