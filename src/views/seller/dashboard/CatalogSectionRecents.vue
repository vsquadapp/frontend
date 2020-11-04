<template>
  <catalog-section title="Adicionados recentemente" :products="products" />
</template>

<script>
import ProductsService from "@/services/products";
import CatalogSection from "./CatalogSection";

export default {
  components: {
    CatalogSection
  },

  data() {
    return {
      products: []
    };
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    async loadProducts() {
      const products = await ProductsService.index();
      this.products = [...products];
      this.products.pop();
    }
  }
};
</script>
