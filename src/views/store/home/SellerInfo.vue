<template>
  <div class="mb-4">
    <div class="mb-3">
      <h1 class="seller-name text-gray-900">
        O Boticário
      </h1>
      <p class="results-count">41 produtos</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: []
    };
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
