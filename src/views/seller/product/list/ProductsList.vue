<template>
  <div class="row">
    <div
      v-for="(product, index) of products"
      :key="index"
      class="col-12 col-md-6 col-xl-4 d-flex align-content-stretch flex-wrap"
    >
      <product-item :product="product" />
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem";

export default {
  components: { ProductItem },

  props: {
    products: Array
  }
};
</script>
