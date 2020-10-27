<template>
  <div class="row">
    <div
      v-for="(product, index) of products"
      :key="index"
      class="col-sm-3 d-flex align-content-stretch flex-wrap"
    >
      <product-item :product="product" />
    </div>
  </div>
</template>

<script>
import ProductItem from "./ProductItem";

export default {
  components: { ProductItem },

  props: {
    products: Array
  }
};
</script>
