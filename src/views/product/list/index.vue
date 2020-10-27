<template>
  <page title="Meus produtos">
    <div class="row">
      <div class="col-sm-3">
        <div class="card mb-4 w-100 bg-gray-100">
          <div class="card-body">
            <categories-list />
          </div>
        </div>
      </div>
      <div class="col-sm-9">
        <div class="card mb-4 w-100">
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import CategoriesList from "./CategoriesList";

export default {
  components: { Page, CategoriesList }
};
</script>
