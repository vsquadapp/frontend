<template>
  <div class="mb-4 w-100 bg-gray-100">
    <div class="">
      <div class="mb-3">
        <h1 class="current-category text-gray-900">
          Categorias
        </h1>
        <p class="show-all" @click="selectCategory(null)">Exibir todas</p>
      </div>
      <div>
        <ul class="categories-list">
          <li
            v-for="category of categories"
            :key="category.id"
            class="category-item text-gray-900"
            :class="{ active: category.id == selected }"
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
export default {
  props: {
    categories: Array,
    selected: [String, Number]
  },

  methods: {
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
  font-size: 22px;
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
  color: black !important;
}

.show-all {
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
}
</style>
