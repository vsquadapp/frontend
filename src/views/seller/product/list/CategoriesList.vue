<template>
  <div class="card mb-4 w-100 bg-gray-100">
    <div class="card-body">
      <slot></slot>
      <div class="mb-3">
        <h1
          class="current-category text-gray-900"
          @click="selectCategory(null)"
        >
          Todos
        </h1>
        <p class="results-count">2 produtos</p>
      </div>
      <div>
        <h2 class="categories-title text-gray-900 font-weight-bold">
          Categorias
        </h2>

        <div v-if="currentCategory">
          <button
            type="button"
            class="btn btn-link text-secondary px-0"
            @click="clearSearch"
          >
            <span>Limpar filtro <i class="fas fa-times fa-xs"></i></span>
          </button>
        </div>

        <ul class="categories-list">
          <li
            v-for="category of categories"
            :key="category.id"
            class="category-item text-gray-900"
            @click="selectCategory(category)"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/products";

export default {
  props: { currentCategory: String },

  data() {
    return {
      categories: []
    };
  },

  mounted() {
    this.loadCategories();
  },

  methods: {
    async loadCategories() {
      const response = await ProductService.categories(1, 100);
      this.categories = response.data.data;
    },

    clearSearch() {
      this.$emit("select-category", null);
    },

    selectCategory(category) {
      this.$emit("select-category", category);
    }
  }
};
</script>

<style lang="scss" scoped>
ul.breadcrumb-categories {
  font-weight: 100;
  font-size: 13px;
  padding: 0px;
  margin: 0px;
  li.breadcrumb-list-item {
    display: inline-block;
    &:hover {
      cursor: pointer;
      font-weight: 400;
    }
  }
}

h1.current-category {
  font-size: 26px;
}
.results-count {
  font-size: 14px;
}

.categories-list {
  list-style-type: none;
  padding: 0px;
}
.categories-title,
.category-item {
  font-size: 16px;
}

.category-item.active,
.category-item:hover {
  cursor: pointer;
  font-weight: 600;
}
</style>
