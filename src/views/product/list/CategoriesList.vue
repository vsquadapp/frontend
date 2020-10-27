<template>
  <div class="card mb-4 w-100 bg-gray-100">
    <div class="card-body">
      <div>
        <ul class="breadcrumb-categories mb-3">
          <li class="breadcrumb-list-item">
            <span class="mr-1">
              Celulares
            </span>
            <i class="fas fa-chevron-right mr-1"></i>
          </li>
          <li class="breadcrumb-list-item">
            Acessórios para Celulares
          </li>
        </ul>
      </div>
      <div class="mb-3">
        <h1 class="current-category text-gray-900">Todos</h1>
        <p class="results-count">2 produtos</p>
      </div>
      <div>
        <h2 class="categories-title text-gray-900 font-weight-bold">
          Categorias
        </h2>
        <ul class="categories-list">
          <li class="category-item text-gray-900">Celulares</li>
          <li class="category-item text-gray-900">Games</li>
          <li class="category-item text-gray-900">Esportes e Fitness</li>
          <li class="category-item text-gray-900">Livros</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
