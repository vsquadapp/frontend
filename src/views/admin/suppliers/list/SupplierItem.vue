<template>
  <tr>
    <td @click="openModal">{{ supplier.name }}</td>
    <td @click="openModal">{{ supplier.phone }}</td>
    <td @click="openModal">{{ supplier.email }}</td>
    <td @click="openModal">{{ supplier.store_name }}</td>
    <supplier-modal :supplier="supplier" v-model:show="show" />
  </tr>
</template>

<script>
import SupplierModal from "./SupplierModal";

export default {
  props: {
    supplier: Object
  },

  components: { SupplierModal },

  data() {
    return {
      show: false
    };
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
