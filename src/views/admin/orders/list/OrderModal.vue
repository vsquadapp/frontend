<template>
  <div
    class="modal fade bd-example-modal-lg"
    data-backdrop="static"
    data-keyboard="false"
    :id="`order-modal-${order.id}`"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Pedido {{ order.order_id }}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-striped table-borderless">
              <tr>
                <th>Produto</th>
                <td>{{ order.product.name }}</td>
                <td>{{ orderQuantity }}</td>
              </tr>
              <tr>
                <th>Valor Total</th>
                <td colspan="2">{{ orderTotalPrice }}</td>
              </tr>
              <tr>
                <th>Status do Pedido</th>
                <td colspan="2">{{ orderStatus }}</td>
              </tr>
              <tr>
                <th>Fornecedor</th>
                <td>{{ order.product.supplier.name }}</td>
                <td>{{ order.product.supplier.phone }}</td>
              </tr>
              <tr>
                <th>Vendedor</th>
                <td>{{ order.seller.name }}</td>
                <td>{{ order.seller.phone }}</td>
              </tr>
              <tr>
                <th>Cliente</th>
                <td>{{ order.client.name }}</td>
                <td>{{ order.client.phone }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import formatMoney from "@/utils/formatMoney";

export default {
  props: ["order", "show"],

  emits: ["update:show"],

  methods: {
    openModal() {
      $(`#order-modal-${this.order.id}`).modal("show");
    },

    close() {
      this.$emit("update:show", false);
    }
  },

  computed: {
    orderQuantity() {
      const quantity = this.order.product.quantity;
      return quantity === 1 ? `${quantity} unidade` : `${quantity} unidades`;
    },

    orderTotalPrice() {
      return formatMoney(
        (this.order.price * this.order.quantity + this.order.delivery_price) /
          100
      );
    },

    orderStatus() {
      return {
        pending: "Pendente",
        canceled: "Cancelado",
        completed: "Concluído"
      }[this.order.status];
    }
  },

  watch: {
    show(value) {
      if (value) {
        this.openModal();
      }
    }
  }
};
</script>
