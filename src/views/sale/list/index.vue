<template>
  <page title="Vendas realizadas">
    <div class="row">
      <div class="col-12 col-md-4 col-xl-3 mb-4">
        <board
          title="Quantidade de vendas"
          :value="sales.length"
          :loading="false"
          color="primary"
          icon="fas fa-handshake"
        />
      </div>

      <div class="col-12 col-md-4 col-xl-3 mb-4">
        <board
          title="Unidades vendidas"
          :value="totalUnits"
          :loading="false"
          color="secondary"
          icon="fas fa-shopping-cart"
        />
      </div>

      <div class="col-12 col-md-4 col-xl-3 mb-4">
        <board
          title="Faturamento bruto"
          :value="totalPrice"
          :loading="false"
          color="success"
          icon="fas fa-dollar-sign"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
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
              <sale-item
                v-for="(sale, index) of sales"
                :key="index"
                :sale="sale"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import SaleItem from "./SaleItem";
import Board from "@/components/Board";
import formatMoney from "@/utils/formatMoney";
import SalesService from "@/services/sales";

export default {
  components: { Page, SaleItem, Board },

  data() {
    return {
      sales: []
    };
  },

  mounted() {
    this.loadProducts();
  },

  computed: {
    totalUnits() {
      return this.sales.reduce((total, order) => {
        return total + order.quantity;
      }, 0);
    },

    totalPrice() {
      const total = this.sales.reduce((total, order) => {
        return total + order.price;
      }, 0);
      return formatMoney(total);
    }
  },

  methods: {
    async loadProducts() {
      this.sales = await SalesService.index();
    }
  }
};
</script>
