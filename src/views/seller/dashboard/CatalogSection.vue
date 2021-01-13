<template>
  <div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="d-flex flex-column flex-sm-row align-items-sm-end">
          <h4 class="mb-0 mr-2">{{ title }}</h4>
          <router-link
            :to="{ name: 'Seller.ListProduct' }"
            class="btn btn-link p-0 pb-0 text-left"
          >
            ver todos
          </router-link>
        </div>
      </div>
    </div>

    <div class="row">
      <product-item
        class="product-item d-flex w-100 col-sm-4 col-lg-3 px-2"
        v-for="(product, index) of products"
        :key="index"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItemSmall";

export default {
  components: {
    ProductItem
  },

  props: { title: String, products: Array }
};
</script>

<style lang="scss" scoped>
.product-item {
  max-width: 280px;
}
</style>
