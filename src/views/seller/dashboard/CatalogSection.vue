<template>
  <div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="d-flex align-items-end">
          <h4 class="mb-0 mr-2">{{ title }}</h4>
          <span class="btn btn-link pb-0">ver todos</span>
        </div>
      </div>
    </div>

    <div class="row">
      <product-item
        class="d-flex w-100 col-sm-4 col-lg-3"
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
  max-width: 250px;
}
</style>
