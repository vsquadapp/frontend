<template>
  <router-view />
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.$store.state.access_token}`;
  }
};
</script>

<style lang="scss">
@import "./assets/scss/sb-admin-2";
</style>
