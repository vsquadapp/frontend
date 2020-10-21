<template>
  <page title="Dashboard">
    <div class="row">
      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Produtos cadastrados"
          value="18"
          color="primary"
          icon="fas fa-box-open"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Vendedores ativos"
          value="6"
          color="info"
          icon="fas fa-user-tie"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Vendas realizadas"
          value="18"
          color="success"
          icon="fas fa-hand-holding-usd"
        />
      </div>

      <div class="col-xl-3 col-md-6 mb-4">
        <board
          title="Pedidos pendentes"
          value="18"
          color="warning"
          icon="fas fa-clock"
        />
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import Board from "@/components/Board";

export default {
  components: { Page, Board }
};
</script>
