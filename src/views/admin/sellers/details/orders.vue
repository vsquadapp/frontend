<template>
  <div>
    <div v-if="!seller.orders.length">
      Esse lojista não possui vendas.
    </div>
    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped table-borderless">
          <tr>
            <th>Pedido</th>
            <th>Status</th>
            <th>Valor do pedido</th>
          </tr>
          <tr v-for="order of seller.orders" :key="order.id">
            <td>{{ order.order_id }}</td>
            <td>{{ orderStatus(order) }}</td>
            <td>{{ orderTotalPrice(order) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import formatMoney from "@/utils/formatMoney";

export default {
  props: ["seller"],

  methods: {
    orderStatus(order) {
      return {
        pending: "Pendente",
        canceled: "Cancelado",
        completed: "Concluído"
      }[order.status];
    },

    orderPaidBySupplier(order) {
      return order.paid_by_seller ? "Sim" : "Não";
    },

    orderQuantity(order) {
      const quantity = order.product.quantity;
      return quantity === 1 ? `${quantity} unidade` : `${quantity} unidades`;
    },

    orderTotalPrice(order) {
      return formatMoney(
        (order.price * order.quantity + order.delivery_price) / 100
      );
    }
  }
};
</script>
