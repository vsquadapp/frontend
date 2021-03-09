<template>
  <page title="Pedidos">
    <div v-if="loading" class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div v-if="orders.length" class="col-12 col-lg-9">
        <orders-list :orders="orders" />

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
import OrdersList from "./OrdersList";

import AdminService from "@/services/admin";

export default {
  components: { Page, OrdersList },

  data() {
    return {
      orders: [],
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
    this.loadOrders();
  },

  computed: {
    ...mapGetters(["user"]),

    showPagination() {
      return this.pagination.current_page < this.pagination.last_page;
    }
  },

  methods: {
    clearSearch() {
      this.$router.push({ name: "Admin.OrdersList", query: { search: "" } });
    },

    async loadOrders() {
      this.loading = true;

      const data = {
        page: this.pagination.current_page,
        params: {
          limit: 10,
          and: [["name", "like", this.search]],
          order: [["created_at", "desc"]]
        }
      };

      const response = await AdminService.orders(this.user.id, data);

      if (this.pagination.current_page === 1) {
        this.orders = [...response.data.data];
      } else {
        this.orders = [...this.orders, ...response.data.data];
      }

      this.pagination.last_page = response.data.last_page;

      this.loading = false;

      return response;
    },

    async nextPage() {
      this.pagination.loading = true;
      this.pagination.current_page++;
      await this.loadOrders();
      this.pagination.loading = false;
    },

    async searchOrders() {
      this.pagination.current_page = 1;
      await this.loadOrders();
    }
  },

  watch: {
    "$route.query.search"(value) {
      this.search = value;
      this.searchOrders();
    }
  }
};
</script>
