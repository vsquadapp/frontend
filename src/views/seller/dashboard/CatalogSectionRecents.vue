<template>
  <catalog-section title="Adicionados recentemente" :products="products" />
</template>

<script>
import ProductService from "@/services/products";
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
        params: {
          limit: 4,
          and: [["quantity", ">", 0]],
          order: [["created_at", "desc"]]
        }
      };
      const response = await ProductService.query(data);
      this.products = response.data.data;
    }
  }
};
</script>
