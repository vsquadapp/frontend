<template>
  <page title="Meus produtos">
    <div v-if="products.length" class="row">
      <div class="col-12 col-lg-3">
        <categories-list />
      </div>
      <div class="col-12 col-lg-9">
        <products-list :products="products" />

        <div v-if="showPagination" class="text-center mb-5">
          <button class="btn btn-primary" @click="loadProducts">
            ver mais
            <div
              v-if="pagination.loading"
              class="spinner-border spinner-border-sm text-light"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
          </button>
        </div>
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
      products: [],
      pagination: {
        next_page: 1,
        last_page: 1,
        loading: false
      }
    };
  },

  mounted() {
    this.loadProducts();
  },

  computed: {
    ...mapGetters({ supplier: "supplier" }),

    showPagination() {
      return this.pagination.next_page <= this.pagination.last_page;
    }
  },

  methods: {
    async loadProducts() {
      this.pagination.loading = true;
      const response = await ProductsService.products(
        this.supplier.id,
        this.pagination.next_page++
      );
      this.products = [...this.products, ...response.data.data];
      this.pagination.last_page = response.data.last_page;
      this.pagination.loading = false;
    }
  }
};
</script>
