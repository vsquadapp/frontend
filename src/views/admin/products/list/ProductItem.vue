<template>
  <tr>
    <td @click="openModal">{{ product.id }}</td>
    <td @click="openModal">{{ product.name }}</td>
    <td @click="openModal">{{ supplierName }}</td>
    <td @click="openModal">{{ createdAt }}</td>
    <product-modal :product="product" v-model:show="show" />
  </tr>
</template>

<script>
import ProductModal from "./ProductModal";
import formatDate from "@/utils/formatDate";

export default {
  props: {
    product: Object
  },

  components: {
    ProductModal
  },

  data() {
    return {
      show: false
    };
  },

  computed: {
    supplierName() {
      return this.product.supplier.name;
    },

    createdAt() {
      return formatDate(this.product.created_at, true);
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
