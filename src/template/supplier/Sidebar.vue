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

    <li class="nav-item">
      <a class="nav-link">
        <i class="fas fa-cogs"></i>
        <span class="pl-1">Configurações</span>
      </a>
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

    <li class="nav-item">
      <a class="nav-link">
        <i class="fas fa-ban"></i>
        <span class="pl-1">Canceladas</span>
      </a>
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
