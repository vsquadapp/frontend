<template>
  <page title="Vendedor">
    <div v-if="loading" class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-12">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: tab === 'details' }"
                @click="setTab('details')"
              >
                Detalhes
              </span>
            </li>
            <li class="nav-item">
              <span
                class="nav-link"
                :class="{ active: tab === 'orders' }"
                @click="setTab('orders')"
              >
                Vendas
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card content p-3 pt-5">
            <div>
              <seller-details v-show="tab === 'details'" :seller="seller" />
              <seller-orders v-show="tab === 'orders'" :seller="seller" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import Page from "@/components/Page";
import AdminService from "@/services/admin";
import sellerDetails from "./details";
import sellerOrders from "./orders";

export default {
  components: { Page, sellerDetails, sellerOrders },

  props: ["seller_id"],

  data() {
    return {
      seller: null,
      loading: false,
      tab: "details"
    };
  },

  beforeMount() {
    this.getSeller();
  },

  computed: {
    ...mapGetters(["user"])
  },

  methods: {
    async getSeller() {
      this.loading = true;
      try {
        const response = await AdminService.sellerById(this.seller_id);
        this.seller = { ...response.data };
      } catch (err) {
        console.err(err);
      }
      this.loading = false;
    },

    setTab(value) {
      this.tab = value;
    }
  }
};
</script>
<style lang="scss">
.card.content {
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.nav-link {
  cursor: pointer;
}
</style>
