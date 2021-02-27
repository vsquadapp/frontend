<template>
  <tr class="seller-name">
    <td>
      <span>
        {{ seller.name }}
      </span>
    </td>
    <td class="text-right">
      <span>
        {{ seller.sales }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    seller: Object
  }
};
</script>

<style lang="scss" scoped>
.seller-name {
  transition: color 0.2s ease;

  &:hover {
    color: black;
  }
}

.slim {
  width: 1%;
}
</style>
