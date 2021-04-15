<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <hr class="sidebar-divider my-0" />

    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'Admin.Dashboard' }">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span class="pl-1">Dashboard</span>
      </router-link>
    </li>

    <hr class="sidebar-divider d-none d-md-block" />

    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'Admin.SuppliersList' }">
        <i class="fas fa-store"></i>
        <span class="pl-1">Fornecedores</span>
      </router-link>
    </li>

    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'Admin.ProductsList' }">
        <i class="fas fa-box"></i>
        <span class="pl-1">Produtos</span>
      </router-link>
    </li>

    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'Admin.SellersList' }">
        <i class="fas fa-user-tie"></i>
        <span class="pl-1">Vendedores</span>
      </router-link>
    </li>

    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'Admin.OrdersList' }">
        <i class="fas fa-hand-holding-usd"></i>
        <span class="pl-1">Pedidos</span>
      </router-link>
    </li>

    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
</template>

<script>
import SBAdmin from "@/assets/js/sb-admin-2.js";

export default {
  mounted() {
    SBAdmin.setup();
  }
};
</script>
