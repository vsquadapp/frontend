<template>
  <page title="Vendas realizadas">
    <div class="card p-2">
      <table class="table table-borderless mb-0">
        <thead>
          <tr>
            <th scope="col" colspan="2">Produto</th>
            <th class="text-right" scope="col">Preço</th>
            <th class="text-right" scope="col">Quantidade</th>
            <th class="text-right" scope="col">Data da venda</th>
          </tr>
        </thead>
        <tbody>
          <sale-item v-for="(sale, index) of sales" :key="index" :sale="sale" />
        </tbody>
      </table>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import SaleItem from "./SaleItem";

import SalesService from "@/services/sales";

export default {
  components: { Page, SaleItem },

  data() {
    return {
      sales: []
    };
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    async loadProducts() {
      this.sales = await SalesService.index();
      console.log(this.sales);
    }
  }
};
</script>
