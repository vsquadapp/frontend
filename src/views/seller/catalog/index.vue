<template>
  <page title="Meus produtos">
    <div v-if="!loading">
      <div v-if="products.length" class="row">
        <div class="col-12 col-lg-3">
          <categories-list :total="total_products" />
        </div>
        <div class="col-12 col-lg-9">
          <products-list :products="products" />

          <div v-if="showPagination" class="text-center mb-5">
            <button class="btn btn-primary" @click="loadProducts">
              <div
                v-if="pagination.loading"
                class="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <span v-else>
                ver mais
              </span>
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        Ainda não foi adicionado nenhum item ao catálogo.
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
import ProductsList from "./ProductsList";

import SellerService from "@/services/sellers";
import { mapGetters } from "vuex";

export default {
  components: { Page, CategoriesList, ProductsList },

  data() {
    return {
      loading: true,
      products: [],
      currentCategoryId: "",
      pagination: {
        current_page: 1,
        last_page: 1,
        loading: false
      },
      total_products: null
    };
  },

  mounted() {
    this.loadProducts();
  },

  computed: {
    ...mapGetters(["seller"]),

    showPagination() {
      return this.pagination.current_page < this.pagination.last_page;
    }
  },

  methods: {
    async loadProducts() {
      this.loading = true;
      const response = await SellerService.products(
        this.seller.id,
        this.pagination.current_page,
        15,
        this.currentCategoryId
      );

      if (this.pagination.current_page === 1) {
        this.products = [...response.data.data];
      } else {
        this.products = [...this.products, ...response.data.data];
      }

      this.total_products = response.data.total;

      this.pagination.last_page = response.data.last_page;

      this.loading = false;
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
