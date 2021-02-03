<template>
  <div id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <top-bar />
          <div class="container px-0">
            <div v-if="seller.loading">
              <div class="col-12 d-flex justify-content-center my-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>
            <div v-else-if="seller.data">
              <router-view></router-view>
            </div>
            <div v-else>
              <div
                class="d-flex flex-column align-items-center text-center my-5 justify-content-center"
              >
                <div class="mb-3">
                  <i class="far fa-frown fa-3x"></i>
                </div>
                <h2>Vendedor não encontrado</h2>
              </div>
            </div>
          </div>
        </div>

        <bottom-bar />
      </div>
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" @click="scrollToTop">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import SellerService from "@/services/sellers";

export default {
  components: {
    TopBar,
    BottomBar
  },

  props: {
    slug: String
  },

  data() {
    return {
      seller: {
        loading: true,
        data: null
      }
    };
  },

  mounted() {
    this.setSeller(null);

    this.loadSeller().then(() => {
      this.loadCategories();
    });
  },

  methods: {
    ...mapMutations({ setSeller: "setStore" }),

    ...mapActions(["loadStore"]),

    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },

    async loadSeller() {
      try {
        this.seller.error = null;
        this.seller.loading = true;
        const seller = await this.loadStore(this.slug);
        this.seller.data = seller;
      } catch (err) {
        this.seller.error = "Vendedor não encontrado";
      }
      this.seller.loading = false;
    },

    async loadCategories() {
      try {
        const response = await SellerService.categories(
          this.seller.data.id,
          1,
          100
        );
        this.categories = response.data.data;
      } catch (err) {
        this.categories = [];
      }
    }
  }
};
</script>

<style lang="scss">
html,
#app,
#page-top,
#wrapper {
  height: 100%;
}
</style>
