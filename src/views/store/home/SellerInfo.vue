<template>
  <div class="mb-4">
    <div class="mb-3">
      <h1 class="seller-name text-gray-900">
        {{ seller.name }}
      </h1>
      <p class="results-count">{{ productsCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: Object
  },

  computed: {
    productsCount() {
      if (this.seller?.products_count) {
        const count = this.seller.products_count;
        return count === 1 ? `${count} produto` : `${count} produtos`;
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
h1.seller-name {
  font-size: 32px;
}

.results-count {
  font-size: 14px;
}
</style>
