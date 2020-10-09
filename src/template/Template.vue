<template>
  <div id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <sidebar />

      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <top-bar />
          <router-view></router-view>
        </div>

        <bottom-bar />
      </div>
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

export default {
  components: {
    Sidebar,
    TopBar,
    BottomBar
  }
};
</script>
