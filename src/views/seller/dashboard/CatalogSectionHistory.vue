<template>
  <catalog-section title="Você pode se interessar" :products="products" />
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
      const data = {
        params: { limit: 4, and: [["quantity", ">", 0]] }
      };
      const response = await ProductsService.query(data);
      this.products = response.data.data;
    }
  }
};
</script>
