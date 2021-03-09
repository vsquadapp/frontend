<template>
  <div class="row">
    <div class="card w-100">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Loja</th>
            </tr>
          </thead>
          <tbody>
            <supplier-item
              v-for="(supplier, index) of suppliers"
              :supplier="supplier"
              :key="index"
            >
            </supplier-item>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SupplierItem from "./SupplierItem";

export default {
  components: { SupplierItem },

  props: {
    suppliers: Array
  }
};
</script>
