<template>
  <tr @click="openSeller">
    <td>{{ seller.name }}</td>
    <td>{{ seller.phone }}</td>
    <td>{{ seller.email }}</td>
    <td>{{ seller.slug }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    seller: Object
  },

  data() {
    return {
      show: false
    };
  },

  methods: {
    openSeller() {
      this.$router.push({
        name: "Admin.SellersDetails",
        params: { seller_id: this.seller.id }
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
