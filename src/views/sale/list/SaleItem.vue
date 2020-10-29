<template>
  <tr>
    <td class="slim text-center">
      <img :src="sale.product.img" alt="" height="30" />
    </td>
    <td>{{ sale.product.name }}</td>
    <td class="text-right">{{ salePrice }}</td>
    <td class="text-right">
      {{ sale.quantity }} {{ sale.quantity == 1 ? "unidade" : "unidades" }}
    </td>
    <td class="text-right">{{ saleDate }}</td>
  </tr>
</template>

<script>
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";

export default {
  props: {
    sale: Object
  },

  computed: {
    salePrice() {
      return formatMoney(this.sale.price);
    },

    saleDate() {
      return formatDate(this.sale.created_at);
    }
  }
};
</script>

<style lang="scss" scoped>
.slim {
  width: 1%;
}
</style>
