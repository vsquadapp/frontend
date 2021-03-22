<template>
  <tr @click="openSupplier">
    <td>{{ supplier.name }}</td>
    <td>{{ supplier.phone }}</td>
    <td>{{ supplier.email }}</td>
    <td>{{ supplier.store_name }}</td>
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
    },

    openSupplier() {
      this.$router.push({
        name: "Admin.SuppliersDetails",
        params: { supplier_id: this.supplier.id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
tr {
  cursor: pointer;
}
</style>
