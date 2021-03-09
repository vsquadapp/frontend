<template>
  <div class="row">
    <div class="card w-100">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fornecedor</th>
              <th>Vendedor</th>
              <th>Status</th>
              <th>Tipo de entrega</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <order-item
              v-for="(order, index) of orders"
              :order="order"
              :key="index"
            >
            </order-item>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from "./OrderItem";

export default {
  components: { OrderItem },

  props: {
    orders: Array
  }
};
</script>
