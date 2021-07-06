<template>
  <nav
    class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
  >
    <div class="container px-0 px-sm-5">
      <span
        @click="redirectToSeller"
        class="btn btn-link sidebar-brand d-flex align-items-center justify-content-center"
      >
        <!-- <div class="sidebar-brand-text mx-3">VSquad</div> -->
        <div class="sidebar-brand-text mx-3">{{ store ? store.slug : "" }}</div>
      </span>

      <!-- Topbar Search -->
      <!-- <form
        v-if="store"
        @submit.prevent="search"
        class="d-none d-sm-inline-block form-inline mr-3 ml-md-3 my-2 my-md-0 mw-100 navbar-search"
      >
        <div class="input-group">
          <input
            type="text"
            class="form-control bg-light border-0 small"
            placeholder="Buscar produtos, marcas e muito mais..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" type="submit">
              <i class="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form> -->

      <ul class="navbar-nav d-none d-sm-flex"></ul>

      <!-- Topbar Navbar -->
      <!-- <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown no-arrow d-sm-none">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-search fa-fw"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
            aria-labelledby="searchDropdown"
          >
            <form
              @submit.prevent="search"
              class="form-inline mr-auto w-100 navbar-search"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control bg-light border-0 small"
                  placeholder="Buscar produtos, marcas e muito mais..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
      </ul> -->

      <ul class="navbar-nav ml-auto">
        <li class="nav-items">
          <button
            type="button"
            class="btn btn-link"
            data-toggle="modal"
            data-target="#searchOrderModal"
          >
            <span class="text-secondary">Acompanhar meu pedido</span>
          </button>
          <searchOrderModal />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

import SearchOrderModal from "@/components/SearchOrderModal";

export default {
  components: {
    SearchOrderModal
  },

  computed: {
    ...mapGetters(["store"])
  },

  methods: {
    redirectToSeller() {
      this.$router.push({
        name: "Store.Home",
        params: { slug: this.store.slug }
      });
    }
  }
};
</script>
