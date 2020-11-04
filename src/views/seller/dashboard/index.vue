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
import Page from "@/components/Page";
import Board from "@/components/Board";
import CatalogSectionHistory from "./CatalogSectionHistory";
import CatalogSectionRecents from "./CatalogSectionRecents";

import {
  loadProductsInfo,
  loadSellersInfo,
  loadSalesInfo,
  loadOrdersInfo
} from "@/services/dashboard";

export default {
  components: { Page, Board, CatalogSectionHistory, CatalogSectionRecents },
  data() {
    return {
      productsInfo: {
        status: "loading",
        value: 0
      },
      sellersInfo: {
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

  methods: {
    loadInfo() {
      this.loadProductsInfo();
      this.loadSellersInfo();
      this.loadSalesInfo();
      this.loadOrdersInfo();
    },
    async loadProductsInfo() {
      try {
        this.productsInfo.value = await loadProductsInfo();
      } catch (err) {
        this.productsInfo.value = "-";
      }
      this.productsInfo.status = "done";
    },
    async loadSellersInfo() {
      try {
        this.sellersInfo.value = await loadSellersInfo();
      } catch (err) {
        this.sellersInfo.value = "-";
      }
      this.sellersInfo.status = "done";
    },
    async loadSalesInfo() {
      try {
        this.salesInfo.value = await loadSalesInfo();
      } catch (err) {
        this.salesInfo.value = "-";
      }
      this.salesInfo.status = "done";
    },
    async loadOrdersInfo() {
      try {
        this.ordersInfo.value = await loadOrdersInfo();
      } catch (err) {
        this.ordersInfo.value = "-";
      }
      this.ordersInfo.status = "done";
    }
  }
};
</script>
