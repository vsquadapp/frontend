<template>
  <page title="">
    <div v-if="seller.loading">
      <div class="col-12 d-flex justify-content-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else-if="seller.data">
      <div class="row">
        <div class="col-12 col-lg-3">
          <seller-info :seller="seller.data" />
          <categories-list
            :categories="categories"
            :selected="currentCategoryId"
            @select-category="onSelectCategory"
          />
        </div>
        <div class="col-12 col-lg-9">
          <div v-if="products.loading">
            <div class="col-12 d-flex justify-content-center my-5">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <div v-else-if="products.list.length">
            <products-list :products="products.list" />
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
          <div v-else>
            <div
              class="d-flex flex-column align-items-center text-center m-3 m-sm-5 justify-content-center"
            >
              <div class="mb-3">
                <i class="far fa-frown fa-3x"></i>
              </div>
              <h4>Ainda não existem produtos cadastrados</h4>
            </div>
          </div>
        </div>
      </div>
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
  </page>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

import Page from "@/components/Page";
import CategoriesList from "./CategoriesList";
import SellerInfo from "./SellerInfo";
import ProductsList from "./ProductsList";

import SellerService from "@/services/sellers";

export default {
  props: { slug: String },

  components: { Page, CategoriesList, ProductsList, SellerInfo },

  data() {
    return {
      products: {
        list: [],
        loading: false,
        pagination: {
          current_page: 1,
          last_page: 1,
          loading: false
        }
      },
      categories: [],
      currentCategoryId: "",
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
      this.loadProducts();
    });
  },

  computed: {
    showPagination() {
      return (
        this.products.pagination.current_page <
        this.products.pagination.last_page
      );
    }
  },

  methods: {
    ...mapMutations({ setSeller: "setStore" }),

    ...mapActions(["loadStore"]),

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
    },

    async loadProducts() {
      this.products.loading = true;
      const response = await SellerService.products(
        this.seller.data.id,
        this.products.pagination.current_page,
        15,
        this.currentCategoryId
      );

      if (this.products.pagination.current_page === 1) {
        this.products.list = [...response.data.data];
      } else {
        this.products.list = [...this.products.list, ...response.data.data];
      }
      this.products.pagination.last_page = response.data.last_page;
      this.products.loading = false;
    },

    async nextPage() {
      this.products.pagination.loading = true;
      this.products.pagination.current_page++;
      this.loadProducts();
      this.products.pagination.loading = false;
    },

    async onSelectCategory(category) {
      if (category) {
        this.currentCategoryId = category.id;
      } else {
        this.currentCategoryId = "";
      }
      this.products.pagination.current_page = 1;
      this.loadProducts();
    }
  }
};
</script>
