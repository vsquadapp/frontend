<template>
  <page title="">
    <div v-if="loading" class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 col-lg-3">
        <categories-list
          :current-category="currentCategoryId"
          @select-category="onSelectCategory"
        >
          <div v-if="search">
            <button
              type="button"
              class="btn btn-link text-secondary px-0"
              @click="clearSearch"
            >
              <span>Limpar busca <i class="fas fa-times fa-xs"></i></span>
            </button>
          </div>
        </categories-list>
      </div>
      <div v-if="products.length" class="col-12 col-lg-9">
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
      <div v-else>Nenhum produto encontrado.</div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import CategoriesList from "./CategoriesList";
import ProductsList from "./ProductsList";

import ProductService from "@/services/products";

export default {
  components: { Page, CategoriesList, ProductsList },

  data() {
    return {
      products: [],
      currentCategoryId: "",
      pagination: {
        current_page: 1,
        last_page: 1,
        loading: false
      },
      search: "",
      loading: true
    };
  },

  mounted() {
    this.search = this.$route.query.search;
    this.loadProducts();
  },

  computed: {
    showPagination() {
      return this.pagination.current_page < this.pagination.last_page;
    }
  },

  methods: {
    clearSearch() {
      this.$router.push({ name: "Seller.ListProduct", query: { search: "" } });
    },

    async loadProducts() {
      this.loading = true;

      const data = {
        page: this.pagination.current_page,
        params: {
          limit: 10,
          and: [
            ["quantity", ">", 0],
            ["name", "like", this.search]
          ],
          order: [["created_at", "desc"]]
        }
      };

      if (this.currentCategoryId) {
        data.params.and.push(["category_id", "=", this.currentCategoryId]);
      }

      const response = await ProductService.query(data);

      if (this.pagination.current_page === 1) {
        this.products = [...response.data.data];
      } else {
        this.products = [...this.products, ...response.data.data];
      }

      this.pagination.last_page = response.data.last_page;

      this.loading = false;

      return response;
    },

    async nextPage() {
      this.pagination.loading = true;
      this.pagination.current_page++;
      await this.loadProducts();
      this.pagination.loading = false;
    },

    async onSelectCategory(category) {
      if (category) {
        this.currentCategoryId = category.id;
      } else {
        this.currentCategoryId = "";
      }
      this.pagination.current_page = 1;
      this.loadProducts();
    },

    async searchProducts() {
      this.pagination.current_page = 1;
      await this.loadProducts();
    }
  },

  watch: {
    "$route.query.search"(value) {
      this.search = value;
      this.searchProducts();
    }
  }
};
</script>
