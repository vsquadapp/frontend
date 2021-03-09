<template>
  <tr>
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
  }
};
</script>
