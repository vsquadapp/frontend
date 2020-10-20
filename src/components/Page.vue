<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  name: "Page",
  props: {
    title: String
  }
};
</script>
