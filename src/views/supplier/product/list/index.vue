<template>
  <page title="Meus produtos">
    <div v-if="loading" class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else-if="products.length" class="row">
      <div class="col-12 col-lg-3">
        <categories-list
          @select-category="onSelectCategory"
          :total="totalProducts"
        />
      </div>
      <div class="col-12 col-lg-9">
        <products-list :products="products" />

        <div v-if="showPagination" class="text-center mb-5">
          <button class="btn btn-primary" @click="nextPage">
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
    <div v-else>
      <h6>Nenhum produto cadastrado</h6>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";

import Page from "@/components/Page";
import CategoriesList from "./CategoriesList";
import ProductsList from "./ProductsList";

import SupplierService from "@/services/suppliers";

export default {
  components: { Page, CategoriesList, ProductsList },

  data() {
    return {
      products: [],
      loading: true,
      currentCategoryId: "",
      pagination: {
        current_page: 1,
        last_page: 1,
        loading: false
      },
      totalProducts: null
    };
  },

  mounted() {
    this.loading = true;
    this.loadProducts();
    this.loading = false;
  },

  computed: {
    ...mapGetters({ supplier: "supplier" }),

    showPagination() {
      return this.pagination.current_page < this.pagination.last_page;
    }
  },

  methods: {
    async loadProducts() {
      const response = await SupplierService.products(
        this.supplier.id,
        this.pagination.current_page,
        this.currentCategoryId
      );

      if (this.pagination.current_page === 1) {
        this.products = [...response.data.data];
      } else {
        this.products = [...this.products, ...response.data.data];
      }
      this.pagination.last_page = response.data.last_page;
      this.totalProducts = response.data.total;
    },

    async nextPage() {
      this.pagination.loading = true;
      this.pagination.current_page++;
      this.loadProducts();
      this.pagination.loading = false;
    },

    async onSelectCategory(category) {
      if (category) {
        this.currentCategoryId = category.id;
      } else {
        this.currentCategoryId = "";
      }
      this.pagination.current_page = 1;
      this.loading = true;
      this.loadProducts();
      this.loading = false;
    }
  }
};
</script>
