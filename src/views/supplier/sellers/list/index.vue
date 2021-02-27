<template>
  <page title="Meus Vendedores">
    <div class="card p-2">
      <table class="table table-borderless table-responsive mb-0">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Produtos vendidos</th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr>
            <td colspan="2" class="text-center">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="sellers.length === 0">
          <td colspan="2" class="text-center">
            Nenhum vendedor ativo.
          </td>
        </tbody>
        <tbody v-else>
          <seller-item
            v-for="(seller, index) of sellers"
            :key="index"
            :seller="seller"
            @reload="loadSellers"
          />
        </tbody>
      </table>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import Page from "@/components/Page";
import SellerItem from "./SellerItem";

import SupplierService from "@/services/suppliers";

export default {
  components: { Page, SellerItem },

  data() {
    return {
      sellers: [],
      loading: true,
      error: false
    };
  },

  computed: {
    ...mapGetters(["supplier"])
  },

  mounted() {
    this.loadSellers();
  },

  methods: {
    async loadSellers() {
      this.loading = true;
      this.error = false;
      try {
        const sellers = await SupplierService.sellers(
          this.supplier.id,
          1,
          15,
          "pending"
        );
        this.sellers = sellers.data;
      } catch (err) {
        this.error = true;
      }
      this.loading = false;
    }
  }
};
</script>
