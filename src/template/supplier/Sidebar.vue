<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <hr class="sidebar-divider my-0" />

    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'Supplier.Dashboard' }">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span class="pl-1">Dashboard</span>
      </router-link>
    </li>

    <hr class="sidebar-divider" />

    <div class="sidebar-heading">
      Minha loja
    </div>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Supplier.ListProduct' }">
        <i class="fas fa-boxes"></i>
        <span class="pl-1">Meus produtos</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Supplier.CreateProduct' }">
        <i class="fas fa-plus"></i>
        <span class="pl-1">Cadastrar produto</span>
      </router-link>
    </li>

    <hr class="sidebar-divider" />

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Supplier.ListSellers' }">
        <i class="fas fa-users"></i>
        <span class="pl-1">Meus Vendedores</span>
      </router-link>
    </li>

    <hr class="sidebar-divider" />

    <div class="sidebar-heading">
      Vendas
    </div>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Supplier.ListOrders' }">
        <i class="far fa-clock"></i>
        <span class="pl-1">Pendentes</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" :to="{ name: 'Supplier.ListSales' }">
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
