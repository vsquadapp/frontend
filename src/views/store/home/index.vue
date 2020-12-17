<template>
  <page title="">
    <div v-if="products.length" class="row">
      <div class="col-12 col-lg-3">
        <seller-info />
        <categories-list @select-category="onSelectCategory" />
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
import Page from "@/components/Page";
import CategoriesList from "./CategoriesList";
import SellerInfo from "./SellerInfo";
import ProductsList from "./ProductsList";

import ProductService from "@/services/products";

export default {
  components: { Page, CategoriesList, ProductsList, SellerInfo },

  data() {
    return {
      products: [],
      currentCategoryId: "",
      pagination: {
        current_page: 1,
        last_page: 1,
        loading: false
      }
    };
  },

  mounted() {
    this.loadProducts();
    console.log(this.$route.params.seller);
  },

  computed: {
    showPagination() {
      return this.pagination.current_page < this.pagination.last_page;
    }
  },

  methods: {
    async loadProducts() {
      const response = await ProductService.index(
        15,
        this.pagination.current_page,
        this.currentCategoryId
      );

      if (this.pagination.current_page === 1) {
        this.products = [...response.data.data];
      } else {
        this.products = [...this.products, ...response.data.data];
      }

      this.pagination.last_page = response.data.last_page;
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
      this.loadProducts();
    }
  }
};
</script>
