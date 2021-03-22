<template>
  <div
    class="modal fade bd-example-modal-lg"
    data-backdrop="static"
    data-keyboard="false"
    :id="`supplier-modal-${supplier.id}`"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ supplier.name }}
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
          <div v-if="!supplier.orders.length">
            Esse fornecedor não possui vendas.
          </div>
          <div v-else>
            <div class="table-responsive">
              <table class="table table-striped table-borderless">
                <tr>
                  <th>Pedido</th>
                  <th>Status</th>
                  <th>Valor do pedido</th>
                  <th>Valor em taxas</th>
                  <th>Pago</th>
                  <th></th>
                </tr>
                <tr v-for="order of supplier.orders" :key="order.id">
                  <td>{{ order.order_id }}</td>
                  <td>{{ orderStatus(order) }}</td>
                  <td>{{ orderTotalPrice(order) }}</td>
                  <td>{{ orderTotalTax(order) }}</td>
                  <td>{{ orderPaidBySupplier(order) }}</td>
                  <td>
                    <button
                      v-if="!order.paid_by_supplier"
                      class="bnt btn-sm btn-primary"
                      @click="paid(order)"
                    >
                      Pagar
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import formatMoney from "@/utils/formatMoney";
import AdminService from "@/services/admin";

export default {
  props: ["supplier", "show"],

  emits: ["update:show"],

  methods: {
    openModal() {
      $(`#supplier-modal-${this.supplier.id}`).modal("show");
    },

    close() {
      this.$emit("update:show", false);
    },

    orderStatus(order) {
      return {
        pending: "Pendente",
        canceled: "Cancelado",
        completed: "Concluído"
      }[order.status];
    },

    orderPaidBySupplier(order) {
      return order.paid_by_seller ? "Sim" : "Não";
    },

    orderQuantity(order) {
      const quantity = order.product.quantity;
      return quantity === 1 ? `${quantity} unidade` : `${quantity} unidades`;
    },

    orderTotalPrice(order) {
      return formatMoney(
        (order.price * order.quantity + order.delivery_price) / 100
      );
    },

    orderTotalTax(order) {
      return formatMoney((order.comission * order.quantity + order.tax) / 100);
    },

    paid(order) {
      this.$swal({
        title: "O fornecedor pagou a comissão do produto?",
        inputAttributes: {
          autocapitalize: "off"
        },
        icon: "warning",
        reverseButtons: true,
        confirmButtonText: "Sim",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return AdminService.markOrderAsPaid(order.id)
            .then(() => {
              order.paid_by_supplier = true;
              return true;
            })
            .catch(error => {
              this.$swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then(response => {
        if (response.isConfirmed) {
          this.$swal.fire({
            icon: "success",
            title: `Informações de pagamento realizado com sucesso!`
          });
        }
      });
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

<style lang="scss" scoped>
.table {
  tr {
    cursor: pointer;
  }
}
</style>
