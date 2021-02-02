<template>
  <page title="Dashboard">
    <div class="row">
      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Produtos cadastrados"
          :value="productsInfo.value"
          :loading="productsInfo.status === 'loading'"
          color="primary"
          icon="fas fa-box-open"
          :redirect-to="{ name: 'Supplier.ListProduct' }"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Vendedores ativos"
          :value="sellersInfo.value"
          :loading="sellersInfo.status === 'loading'"
          color="info"
          icon="fas fa-user-tie"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Vendas realizadas"
          :value="salesInfo.value"
          :loading="salesInfo.status === 'loading'"
          color="success"
          icon="fas fa-hand-holding-usd"
          :redirect-to="{ name: 'Supplier.ListSales' }"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Pedidos pendentes"
          :value="ordersInfo.value"
          :loading="ordersInfo.status === 'loading'"
          color="warning"
          icon="fas fa-clock"
          :redirect-to="{ name: 'Supplier.ListOrders' }"
        />
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import Board from "@/components/Board";

import SupplierService from "@/services/suppliers";
import { mapGetters } from "vuex";

export default {
  components: { Page, Board },

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

  computed: {
    ...mapGetters(["supplier"])
  },

  methods: {
    async loadInfo() {
      const response = await SupplierService.dashboard(this.supplier.id);

      this.setProductsInfo(response.data.products);
      this.setSellersInfo(response.data.sellers);
      this.setSalesInfo(response.data.orders_completed);
      this.setOrdersInfo(response.data.orders_pending);
    },

    async setProductsInfo(value) {
      this.productsInfo.value = value;
      this.productsInfo.status = "done";
    },

    async setSellersInfo(value) {
      this.sellersInfo.value = value;
      this.sellersInfo.status = "done";
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
