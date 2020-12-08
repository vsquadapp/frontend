<template>
  <page title="Meus produtos">
    <div v-if="products.length" class="row">
      <div class="col-12 col-lg-3">
        <categories-list />
      </div>
      <div class="col-12 col-lg-9">
        <products-list :products="products" />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";

import Page from "@/components/Page";
import CategoriesList from "./CategoriesList";
import ProductsList from "./ProductsList";

import ProductsService from "@/services/suppliers";

export default {
  components: { Page, CategoriesList, ProductsList },

  data() {
    return {
      products: []
    };
  },

  mounted() {
    this.loadProducts();
  },

  computed: {
    ...mapGetters({ supplier: "supplier" })
  },

  methods: {
    async loadProducts() {
      const response = await ProductsService.products(this.supplier.id);
      this.products = response.data.data;
    }
  }
};
</script>
