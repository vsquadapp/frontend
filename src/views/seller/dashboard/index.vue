<template>
  <page title="Dashboard">
    <div class="row mb-3 mb-sm-4">
      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Produtos à venda"
          :value="productsInfo.value"
          :loading="productsInfo.status === 'loading'"
          color="primary"
          icon="fas fa-box-open"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Vendas realizadas"
          :value="salesInfo.value"
          :loading="salesInfo.status === 'loading'"
          color="success"
          icon="fas fa-hand-holding-usd"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Pedidos pendentes"
          :value="ordersInfo.value"
          :loading="ordersInfo.status === 'loading'"
          color="warning"
          icon="fas fa-clock"
        />
      </div>
    </div>
    <div class="mb-3 mb-sm-4">
      <catalog-section-recents />
    </div>
    <div class="mb-3 mb-sm-4">
      <catalog-section-history />
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import Page from "@/components/Page";
import Board from "@/components/Board";
import CatalogSectionHistory from "./CatalogSectionHistory";
import CatalogSectionRecents from "./CatalogSectionRecents";

import SellerService from "@/services/sellers";

export default {
  components: { Page, Board, CatalogSectionHistory, CatalogSectionRecents },
  data() {
    return {
      productsInfo: {
        status: "loading",
        value: 0
      },
      salesInfo: {
        status: "loading",
        value: 0
      },
      ordersInfo: {
        status: "loading",
        value: 0
      }
    };
  },

  mounted() {
    this.loadInfo();
  },

  computed: {
    ...mapGetters(["seller"])
  },

  methods: {
    async loadInfo() {
      const response = await SellerService.dashboard(this.seller.id);
      this.setProductsInfo(response.data.products);
      this.setSalesInfo(response.data.orders_completed);
      this.setOrdersInfo(response.data.orders_pending);
    },
    async setProductsInfo(value) {
      this.productsInfo.value = value;
      this.productsInfo.status = "done";
    },
    async setSalesInfo(value) {
      this.salesInfo.value = value;
      this.salesInfo.status = "done";
    },
    async setOrdersInfo(value) {
      this.ordersInfo.value = value;
      this.ordersInfo.status = "done";
    }
  }
};
</script>
