<template>
  <div class="card mb-4 w-100 bg-gray-100">
    <div class="card-body">
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
import { mapGetters } from "vuex";

import SupplierService from "@/services/suppliers";

export default {
  data() {
    return {
      categories: []
    };
  },

  mounted() {
    this.loadCategories();
  },

  computed: {
    ...mapGetters(["supplier"])
  },

  methods: {
    async loadCategories() {
      const response = await SupplierService.categories(
        this.supplier.id,
        1,
        100
      );
      this.categories = response.data.data;
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
