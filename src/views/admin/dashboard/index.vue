<template>
  <page title="Dashboard">
    <div class="row mb-3 mb-sm-4">
      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Vendas realizadas"
          :value="salesInfo.value"
          :loading="salesInfo.status === 'loading'"
          color="success"
          icon="fas fa-hand-holding-usd"
          :redirect-to="{ name: 'Admin.OrdersList' }"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Pedidos pendentes"
          :value="ordersInfo.value"
          :loading="ordersInfo.status === 'loading'"
          color="warning"
          icon="fas fa-clock"
          :redirect-to="{ name: 'Admin.OrdersList' }"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Produtos à venda"
          :value="productsInfo.value"
          :loading="productsInfo.status === 'loading'"
          color="primary"
          icon="fas fa-box-open"
          :redirect-to="{ name: 'Admin.ProductsList' }"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Lojistas"
          :value="suppliers.value"
          :loading="suppliers.status === 'loading'"
          color="primary"
          icon="fas fa-clock"
          :redirect-to="{ name: 'Admin.SuppliersList' }"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Vendedores"
          :value="sellers.value"
          :loading="sellers.status === 'loading'"
          color="primary"
          icon="fas fa-clock"
          :redirect-to="{ name: 'Admin.SellersList' }"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Total de pedidos"
          :value="orders.value"
          :loading="orders.status === 'loading'"
          color="primary"
          icon="fas fa-clock"
          :redirect-to="{ name: 'Admin.OrdersList' }"
        />
      </div>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import Page from "@/components/Page";
import Board from "@/components/Board";

import AdminService from "@/services/admin";

export default {
  components: { Page, Board },
  data() {
    return {
      productsInfo: { status: "loading", value: 0 },
      salesInfo: { status: "loading", value: 0 },
      ordersInfo: { status: "loading", value: 0 },
      sellers: { status: "loading", value: 0 },
      suppliers: { status: "loading", value: 0 },
      orders: { status: "loading", value: 0 }
    };
  },

  mounted() {
    this.loadInfo();
  },

  computed: {
    ...mapGetters(["user"])
  },

  methods: {
    async loadInfo() {
      const response = await AdminService.dashboard(this.user.id);
      this.setProductsInfo(response.data.products);
      this.setSalesInfo(response.data.orders_completed);
      this.setOrdersInfo(response.data.orders_pending);
      this.setSellers(response.data.sellers_count);
      this.setSuppliers(response.data.suppliers_count);
      this.setOrders(response.data.orders_count);
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
    },
    async setSellers(value) {
      this.sellers.value = value;
      this.sellers.status = "done";
    },
    async setSuppliers(value) {
      this.suppliers.value = value;
      this.suppliers.status = "done";
    },
    async setOrders(value) {
      this.orders.value = value;
      this.orders.status = "done";
    }
  }
};
</script>
