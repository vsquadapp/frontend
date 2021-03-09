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
            <seller-item
              v-for="(seller, index) of sellers"
              :seller="seller"
              :key="index"
            >
            </seller-item>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SellerItem from "./SellerItem";

export default {
  components: { SellerItem },

  props: {
    sellers: Array
  }
};
</script>
