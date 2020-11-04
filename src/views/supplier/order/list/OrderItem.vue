<template>
  <tr>
    <td class="slim text-center">
      <img :src="order.product.img" alt="" height="30" />
    </td>
    <td>
      <span class="product-name" @click="openModal">
        {{ order.product.name }}
      </span>
    </td>
    <td class="text-right">{{ orderPrice }}</td>
    <td class="text-right">
      {{ order.quantity }} {{ order.quantity == 1 ? "unidade" : "unidades" }}
    </td>
    <td class="text-right">{{ orderDate }}</td>
    <div
      class="modal fade bd-example-modal-lg"
      :id="`order-modal-${order.id}`"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Pedido #123841</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <div>
                <img :src="order.product.img" height="200" />
              </div>
              <div class="">
                <h5 class="text-gray-900 mb-2">
                  {{ order.product.name }}
                </h5>
                <p class="mb-4">
                  {{ order.quantity }}
                  {{
                    order.quantity === 1
                      ? "unidade vendida"
                      : "unidades vendidas"
                  }}
                </p>

                <div class="d-flex justify-content-around">
                  <div>
                    <small>Valor da venda</small>
                    <p class="mb-2 text-gray-800">
                      {{ orderPrice }}
                    </p>
                  </div>
                  <div>
                    <small>Valor a receber</small>
                    <p class="text-gray-900">
                      {{ receivedPrice }}
                    </p>
                  </div>
                  <div>
                    <small>Data do pedido</small>
                    <p class="text-gray-800">
                      {{ orderDate }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              @click="finishOrder"
              class="btn btn-success"
              data-dismiss="modal"
            >
              Concluir pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  </tr>
</template>

<script>
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";
import $ from "jquery";

export default {
  props: {
    order: Object
  },

  computed: {
    orderPrice() {
      return formatMoney(this.order.price);
    },

    receivedPrice() {
      return formatMoney(this.order.received);
    },

    orderDate() {
      return formatDate(this.order.created_at);
    }
  },

  methods: {
    openModal() {
      $(`#order-modal-${this.order.id}`).modal("show");
    },

    finishOrder() {
      this.$swal({
        title: "O produto foi entrege ao cliente?",
        inputAttributes: {
          autocapitalize: "off"
        },
        reverseButtons: true,
        confirmButtonText: "Sim!",
        showCancelButton: true,
        cancelButtonText: "Ainda não.",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(true);
            }, 500);
          })
            .then(() => {
              return true;
            })
            .catch(error => {
              this.$swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then(() => {
        this.$swal.fire({
          icon: "success",
          title: `Venda realizada com sucesso!`
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.product-name {
  cursor: pointer;
}

.slim {
  width: 1%;
}
</style>