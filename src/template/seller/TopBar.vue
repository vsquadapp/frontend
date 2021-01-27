<template>
  <nav
    class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
  >
    <!-- Sidebar Toggle (Topbar) -->
    <button
      id="sidebarToggleTop"
      class="btn btn-link text-secondary d-md-none rounded-circle mr-3"
    >
      <i class="fa fa-bars"></i>
    </button>

    <!-- Topbar Search -->
    <form
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
          <button class="btn btn-secondary" type="submit">
            <i class="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
    </form>

    <ul class="navbar-nav d-none d-sm-flex">
      <!-- <li class="nav-item dropdown mx-1">
        <a
          class="nav-link dropdown-toggle text-gray-700 pl-0"
          href="#"
          id="categoriesDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Categorias
        </a>
        <div
          class="dropdown-list dropdown-menu dropdown-menu-left shadow animated--grow-in"
          aria-labelledby="categoriesDropdown"
        >
          <a class="dropdown-item d-flex align-items-center border-0" href="#">
            <div>
              Esporte e lazer
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center border-0" href="#">
            <div>
              Tecnologia
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center border-0" href="#">
            <div>
              Moda
            </div>
          </a>
        </div>
      </li> 
      -->
      <li class="nav-item mx-1">
        <router-link
          class="nav-link text-gray-700 pl-0"
          :to="{ name: 'Seller.Stores' }"
        >
          <span>Lojas oficiais</span>
        </router-link>
      </li>
    </ul>

    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <!-- Nav Item - Search Dropdown (Visible Only XS) -->
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
        <!-- Dropdown - Messages -->
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
                <button class="btn btn-secondary" type="submit">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

      <!-- Nav Item - Alerts -->
      <li class="nav-item dropdown no-arrow mx-1">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="alertsDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-bell fa-fw"></i>
          <!-- Counter - Alerts -->
          <span class="badge badge-danger badge-counter">3+</span>
        </a>
        <!-- Dropdown - Alerts -->
        <div
          class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="alertsDropdown"
        >
          <h6 class="dropdown-header">
            Alerts Center
          </h6>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-secondary">
                <i class="fas fa-file-alt text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 12, 2019</div>
              <span class="font-weight-bold"
                >A new monthly report is ready to download!</span
              >
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-success">
                <i class="fas fa-donate text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 7, 2019</div>
              $290.29 has been deposited into your account!
            </div>
          </a>
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
              <div class="icon-circle bg-warning">
                <i class="fas fa-exclamation-triangle text-white"></i>
              </div>
            </div>
            <div>
              <div class="small text-gray-500">December 2, 2019</div>
              Spending Alert: We've noticed unusually high spending for your
              account.
            </div>
          </a>
          <a class="dropdown-item text-center small text-gray-500" href="#"
            >Show All Alerts</a
          >
        </div>
      </li>

      <div class="topbar-divider d-none d-sm-block"></div>

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">
            {{ userName }}
          </span>
          <div class="user-icon">
            <i class="fas fa-user"></i>
          </div>
        </a>
        <!-- Dropdown - User Information -->
        <div
          class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <a class="dropdown-item" href="#">
            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            Profile
          </a>
          <a class="dropdown-item" href="#">
            <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
            Settings
          </a>
          <a class="dropdown-item" href="#">
            <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
            Activity Log
          </a>
          <div class="dropdown-divider"></div>
          <a
            class="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
    <!-- Logout Modal-->
    <logout-modal />
  </nav>
</template>

<script>
import { mapState } from "vuex";

import LogoutModal from "@/components/template/LogoutModal";

export default {
  components: {
    LogoutModal
  },

  methods: {
    search() {
      this.$router.push({ name: "Seller.ListProduct" });
    }
  },

  computed: {
    ...mapState(["user"]),

    userName() {
      return this.user?.name || "";
    }
  }
};
</script>
