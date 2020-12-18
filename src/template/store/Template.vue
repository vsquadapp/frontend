<template>
  <div id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <top-bar />
          <div class="container">
            <router-view></router-view>
          </div>
        </div>

        <bottom-bar />
      </div>
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" @click="scrollToTop">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

export default {
  components: {
    TopBar,
    BottomBar
  },

  methods: {
    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss">
html,
#app,
#page-top,
#wrapper {
  height: 100%;
}
</style>
