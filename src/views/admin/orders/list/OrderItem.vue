<template>
  <tr>
    <td @click="openModal">{{ order.order_id }}</td>
    <td @click="openModal">{{ supplierName }}</td>
    <td @click="openModal">{{ sellerName }}</td>
    <td @click="openModal">{{ orderStatus }}</td>
    <td @click="openModal">{{ orderType }}</td>
    <td @click="openModal">{{ createdAt }}</td>
    <order-modal :order="order" v-model:show="show" />
  </tr>
</template>

<script>
import formatDate from "@/utils/formatDate";
import OrderModal from "./OrderModal";

export default {
  props: {
    order: Object
  },

  components: {
    OrderModal
  },

  data() {
    return {
      show: false
    };
  },

  computed: {
    orderStatus() {
      return {
        pending: "Pendente",
        canceled: "Cancelado",
        completed: "Concluído"
      }[this.order.status];
    },

    supplierName() {
      return this.order.product.supplier.name;
    },

    sellerName() {
      return this.order.seller.name;
    },

    orderType() {
      return {
        delivery: "Entrega",
        pickup: "Retirada"
      }[this.order.delivery_type];
    },

    createdAt() {
      return formatDate(this.order.created_at, true);
    }
  },

  methods: {
    openModal() {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  cursor: pointer;
}
</style>
