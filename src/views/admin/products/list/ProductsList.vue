<template>
  <div class="row">
    <div class="card w-100">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Lojista</th>
              <th>Data de criação</th>
            </tr>
          </thead>
          <tbody>
            <product-item
              v-for="(product, index) of products"
              :product="product"
              :key="index"
            >
            </product-item>
          </tbody>
        </table>
      </div>
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
