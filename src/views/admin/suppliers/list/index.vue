<template>
  <page title="Fornecedores">
    <div v-if="loading" class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div v-if="suppliers.length" class="col-12 col-lg-9">
        <suppliers-list :suppliers="suppliers" />

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
import SuppliersList from "./SuppliersList";

import AdminService from "@/services/admin";

export default {
  components: { Page, SuppliersList },

  data() {
    return {
      suppliers: [],
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
    this.loadSuppliers();
  },

  computed: {
    ...mapGetters(["user"]),

    showPagination() {
      return this.pagination.current_page < this.pagination.last_page;
    }
  },

  methods: {
    clearSearch() {
      this.$router.push({ name: "Admin.SuppliersList", query: { search: "" } });
    },

    async loadSuppliers() {
      this.loading = true;

      const data = {
        page: this.pagination.current_page,
        params: {
          limit: 10,
          and: [["name", "like", this.search]],
          order: [["name", "asc"]]
        }
      };

      const response = await AdminService.suppliers(this.user.id, data);

      if (this.pagination.current_page === 1) {
        this.suppliers = [...response.data.data];
      } else {
        this.suppliers = [...this.suppliers, ...response.data.data];
      }

      this.pagination.last_page = response.data.last_page;

      this.loading = false;

      return response;
    },

    async nextPage() {
      this.pagination.loading = true;
      this.pagination.current_page++;
      await this.loadSuppliers();
      this.pagination.loading = false;
    },

    async searchSuppliers() {
      this.pagination.current_page = 1;
      await this.loadSuppliers();
    }
  },

  watch: {
    "$route.query.search"(value) {
      this.search = value;
      this.searchSuppliers();
    }
  }
};
</script>
