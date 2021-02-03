<template>
  <page title="Vendas realizadas">
    <div class="row">
      <div class="col-12 col-md-4 col-xl-3 mb-4">
        <board
          title="Quantidade de vendas"
          :value="sales.length"
          :loading="loading"
          color="primary"
          icon="fas fa-handshake"
        />
      </div>

      <div class="col-12 col-md-4 col-xl-3 mb-4">
        <board
          title="Unidades vendidas"
          :value="totalUnits"
          :loading="loading"
          color="secondary"
          icon="fas fa-shopping-cart"
        />
      </div>

      <div class="col-12 col-md-4 col-xl-3 mb-4">
        <board
          title="Faturamento bruto"
          :value="totalPrice"
          :loading="loading"
          color="success"
          icon="fas fa-dollar-sign"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card p-2">
          <table class="table table-borderless table-responsive mb-0">
            <thead>
              <tr>
                <th scope="col" colspan="2">Produto</th>
                <th class="text-right" scope="col">Preço</th>
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
            <tbody v-else-if="sales.length === 0">
              <td colspan="5" class="text-center">
                Nenhuma venda registrada.
              </td>
            </tbody>
            <tbody v-else>
              <sale-item
                v-for="(sale, index) of sales"
                :key="index"
                :sale="sale"
                @reload="loadProducts"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import Page from "@/components/Page";
import SaleItem from "./SaleItem";
import Board from "@/components/Board";
import formatMoney from "@/utils/formatMoney";
import SupplierService from "@/services/suppliers";

export default {
  components: { Page, SaleItem, Board },

  data() {
    return {
      sales: [],
      loading: true,
      error: false
    };
  },

  mounted() {
    this.loadProducts();
  },

  computed: {
    ...mapGetters(["supplier"]),

    totalUnits() {
      return this.sales.reduce((total, order) => {
        return total + order.quantity;
      }, 0);
    },

    totalPrice() {
      const total = this.sales.reduce((total, order) => {
        return total + order.price;
      }, 0);
      return formatMoney(total / 100);
    }
  },

  methods: {
    async loadProducts() {
      this.loading = true;
      this.error = false;
      try {
        const sales = await SupplierService.orders(
          this.supplier.id,
          1,
          15,
          "completed"
        );
        this.sales = sales.data.data;
      } catch (err) {
        this.error = true;
      }
      this.loading = false;
    }
  }
};
</script>
