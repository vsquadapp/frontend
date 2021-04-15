<template>
  <page title="Produtos">
    <div v-if="loading" class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div v-if="products.length" class="col-12 col-lg-9">
        <products-list :products="products" @update-list="reloadProducts" />

        <div v-if="showPagination" class="text-center my-3">
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
      <div v-else>
        <div class="col-12">
          Nenhum produto encontrado.
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import Page from "@/components/Page";
import ProductsList from "./ProductsList";

import AdminService from "@/services/admin";

export default {
  components: { Page, ProductsList },

  data() {
    return {
      products: [],
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
    ...mapGetters(["user"]),

    showPagination() {
      return this.pagination.current_page < this.pagination.last_page;
    }
  },

  methods: {
    clearSearch() {
      this.$router.push({ name: "Admin.ProductsList", query: { search: "" } });
    },

    async loadProducts() {
      this.loading = true;

      const data = {
        page: this.pagination.current_page,
        params: {
          limit: 10,
          and: [["name", "like", this.search]],
          order: [["created_at", "desc"]]
        }
      };

      const response = await AdminService.products(this.user.id, data);

      if (this.pagination.current_page === 1) {
        this.products = [...response.data.data];
      } else {
        this.products = [...this.products, ...response.data.data];
      }

      this.pagination.last_page = response.data.last_page;

      this.loading = false;

      return response;
    },

    async reloadProducts() {
      this.pagination.loading = true;
      this.pagination.current_page = 1;
      await this.loadProducts();
      this.pagination.loading = false;
    },

    async nextPage() {
      this.pagination.loading = true;
      this.pagination.current_page++;
      await this.loadProducts();
      this.pagination.loading = false;
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
