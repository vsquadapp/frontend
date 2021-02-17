<template>
  <tr>
    <td class="slim text-center">
      <img :src="order.product.images[0].image" alt="" height="30" />
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
      data-backdrop="static"
      data-keyboard="false"
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

                <div class="row mb-3">
                  <div class="col-sm-6">
                    <small>Nome do cliente</small>
                    <div>
                      {{ order.client.name }}
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <small>Nome do vendedor</small>
                    <div>
                      {{ order.seller.name }}
                    </div>
                  </div>
                </div>

                <div v-if="isDelivery" class="row mb-3">
                  <div class="col-sm-12">
                    <small>Endereço de entrega</small>
                    <div>
                      <span>{{ order.client.street }}</span>
                      <span v-if="order.client.number">
                        , {{ order.client.number }}
                      </span>
                    </div>
                    <div>
                      {{ order.client.district }}
                    </div>
                    <div>
                      {{ order.client.complement }}
                    </div>
                    <div>
                      {{ order.client.city }}
                    </div>
                  </div>
                </div>

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
import OrderService from "@/services/orders";
import $ from "jquery";

export default {
  props: {
    order: Object
  },

  computed: {
    orderSubtotal() {
      return this.order.price * this.order.quantity;
    },

    orderPrice() {
      let total = this.orderSubtotal;
      if (this.isDelivery) {
        total += this.order.delivery_price;
      }
      return formatMoney(total / 100);
    },

    receivedPrice() {
      const received =
        this.orderSubtotal - this.order.tax - this.order.comission;
      return formatMoney(received / 100);
    },

    isDelivery() {
      return this.order.delivery_type === "delivery";
    },

    orderDate() {
      return formatDate(this.order.created_at, true);
    }
  },

  methods: {
    openModal() {
      $(`#order-modal-${this.order.id}`).modal("show");
    },

    async finishOrder() {
      await this.$swal({
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
          return OrderService.complete(this.order.id)
            .then(response => {
              return response.data;
            })
            .catch(error => {
              this.$swal.fire({
                icon: "error",
                title: `Não foi possível concluir o pedido.`,
                text: error.response.data.error
              });
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      })
        .then(async response => {
          if (response.isConfirmed) {
            await this.$swal.fire({
              icon: "success",
              title: `Venda realizada com sucesso!`
            });
            this.$emit("reload");
          } else {
            this.openModal();
          }
        })
        .catch(() => {
          this.openModal();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.product-name {
  cursor: pointer;

  transition: color 0.2s ease;

  &:hover {
    color: black;
  }
}

.slim {
  width: 1%;
}
</style>
