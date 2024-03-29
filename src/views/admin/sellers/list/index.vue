<template>
  <page title="Vendedores">
    <div v-if="loading" class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div v-if="sellers.length" class="col-12 col-lg-9">
        <sellers-list :sellers="sellers" />

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
      <div v-else>Nenhum produto encontrado.</div>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import Page from "@/components/Page";
import SellersList from "./SellersList";

import AdminService from "@/services/admin";

export default {
  components: { Page, SellersList },

  data() {
    return {
      sellers: [],
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
    this.loadSellers();
  },

  computed: {
    ...mapGetters(["user"]),

    showPagination() {
      return this.pagination.current_page < this.pagination.last_page;
    }
  },

  methods: {
    clearSearch() {
      this.$router.push({ name: "Admin.SellersList", query: { search: "" } });
    },

    async loadSellers() {
      this.loading = true;

      const data = {
        page: this.pagination.current_page,
        params: {
          limit: 10,
          and: [["name", "like", this.search]],
          order: [["name", "asc"]]
        }
      };

      const response = await AdminService.sellers(this.user.id, data);

      if (this.pagination.current_page === 1) {
        this.sellers = [...response.data.data];
      } else {
        this.sellers = [...this.sellers, ...response.data.data];
      }

      this.pagination.last_page = response.data.last_page;

      this.loading = false;

      return response;
    },

    async nextPage() {
      this.pagination.loading = true;
      this.pagination.current_page++;
      await this.loadSellers();
      this.pagination.loading = false;
    },

    async searchSellers() {
      this.pagination.current_page = 1;
      await this.loadSellers();
    }
  },

  watch: {
    "$route.query.search"(value) {
      this.search = value;
      this.searchSellers();
    }
  }
};
</script>
