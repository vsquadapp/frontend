<template>
  <tr>
    <td class="slim text-center">
      <img :src="order.product.img" alt="" height="30" />
    </td>
    <td>{{ order.product.name }}</td>
    <td class="text-right">{{ orderPrice }}</td>
    <td class="text-right">{{ order.quantity }} unidade</td>
    <td class="text-right">{{ orderDate }}</td>
  </tr>
</template>

<script>
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";

export default {
  props: {
    order: Object
  },

  computed: {
    orderPrice() {
      return formatMoney(this.order.price);
    },

    orderDate() {
      return formatDate(this.order.created_at);
    }
  }
};
</script>

<style lang="scss" scoped>
.slim {
  width: 1%;
}
</style>
