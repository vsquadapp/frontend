<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <a class="sidebar-brand d-flex align-items-center justify-content-center">
      <div class="sidebar-brand-text mx-3">VSquad</div>
    </a>

    <hr class="sidebar-divider my-0" />

    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'Seller.Dashboard' }">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span class="pl-1">Dashboard</span>
      </router-link>
    </li>

    <hr class="sidebar-divider" />

    <div class="sidebar-heading">
      Minha loja
    </div>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Seller.Dashboard' }">
        <i class="fas fa-book-open"></i>
        <span class="pl-1">Meu catálogo</span>
      </router-link>
    </li>

    <hr class="sidebar-divider" />

    <div class="sidebar-heading">
      Vendas
    </div>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Seller.ListOrders' }">
        <i class="far fa-clock"></i>
        <span class="pl-1">Pendentes</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Seller.ListSales' }">
        <i class="far fa-handshake"></i>
        <span class="pl-1">Realizadas</span>
      </router-link>
    </li>

    <hr class="sidebar-divider d-none d-md-block" />

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
