<template>
  <page title="Pedidos pendentes">
    <div class="card p-2">
      <table class="table table-borderless table-responsive-sm mb-0">
        <thead>
          <tr>
            <th scope="col" colspan="2">Produto</th>
            <th class="text-right" scope="col">Comissão</th>
            <th class="text-right" scope="col">Quantidade</th>
            <th class="text-right" scope="col">Data do pedido</th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr>
            <td colspan="5" class="text-center">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="orders.length === 0">
          <td colspan="5" class="text-center">
            Nenhuma venda registrada.
          </td>
        </tbody>
        <tbody v-else>
          <order-item
            v-for="(order, index) of orders"
            :key="index"
            :order="order"
            @reload="loadProducts"
          />
        </tbody>
      </table>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import Page from "@/components/Page";
import OrderItem from "./OrderItem";

import SellerService from "@/services/sellers";

export default {
  components: { Page, OrderItem },

  data() {
    return {
      orders: [],
      loading: true,
      error: false
    };
  },

  computed: {
    ...mapGetters(["seller"])
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    async loadProducts() {
      this.loading = true;
      this.error = false;
      try {
        const orders = await SellerService.orders(
          this.seller.id,
          1,
          15,
          "pending"
        );
        this.orders = orders.data.data;
      } catch (err) {
        this.error = true;
      }
      this.loading = false;
    }
  }
};
</script>
