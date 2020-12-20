<template>
  <page title="Pedidos pendentes">
    <div class="card p-2">
      <table class="table table-borderless mb-0">
        <thead>
          <tr>
            <th scope="col" colspan="2">Produto</th>
            <th class="text-right" scope="col">Comissão</th>
            <th class="text-right" scope="col">Quantidade</th>
            <th class="text-right" scope="col">Data do pedido</th>
          </tr>
        </thead>
        <tbody>
          <order-item
            v-for="(order, index) of orders"
            :key="index"
            :order="order"
          />
        </tbody>
      </table>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import OrderItem from "./OrderItem";

import OrderService from "@/services/orders";

export default {
  components: { Page, OrderItem },

  data() {
    return {
      orders: []
    };
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    async loadProducts() {
      this.orders = await OrderService.index();
    }
  }
};
</script>
