<template>
  <tr @click="openSupplier">
    <td>{{ supplier.name }}</td>
    <td>{{ supplier.phone }}</td>
    <td>{{ supplier.email }}</td>
    <td>{{ supplier.store_name }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    supplier: Object
  },

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
