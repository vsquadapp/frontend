<template>
  <tr>
    <td class="slim text-center">
      <img :src="sale.product.images[0].image" alt="" height="30" />
    </td>
    <td>
      <span class="product-name" @click="openModal">
        {{ sale.product.name }}
      </span>
    </td>
    <td class="text-right">{{ salePrice }}</td>
    <td class="text-right">
      {{ sale.quantity }} {{ sale.quantity == 1 ? "unidade" : "unidades" }}
    </td>
    <td class="text-right">{{ saleDate }}</td>
    <div
      class="modal fade bd-example-modal-lg"
      :id="`sale-modal-${sale.id}`"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Venda {{ sale.order_id }}
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
                <img :src="sale.product.img" height="200" />
              </div>
              <div class="">
                <h5 class="text-gray-900 mb-2">
                  {{ sale.product.name }}
                </h5>
                <p class="mb-4">
                  {{ sale.quantity }}
                  {{
                    sale.quantity === 1
                      ? "unidade vendida"
                      : "unidades vendidas"
                  }}
                </p>

                <div class="row">
                  <div class="col-sm-6">
                    <small>Nome do cliente</small>
                    <p>
                      {{ sale.client.name }}
                    </p>
                  </div>

                  <div class="col-sm-6">
                    <small>Nome do vendedor</small>
                    <p>
                      {{ sale.seller.name }}
                    </p>
                  </div>
                </div>

                <div class="d-flex justify-content-around row">
                  <div>
                    <small>Valor da venda</small>
                    <p class="mb-2 text-gray-800">
                      {{ salePrice }}
                    </p>
                  </div>
                  <div v-if="isDelivery">
                    <small>Valor do frete</small>
                    <p class="mb-2 text-gray-800">
                      {{ deliveryPrice }}
                    </p>
                  </div>
                  <div>
                    <small>Valor recebido</small>
                    <p class="text-gray-900">
                      {{ receivedPrice }}
                    </p>
                  </div>
                  <div>
                    <small>Comissão para o vendedor</small>
                    <p class="text-gray-900">
                      {{ comissionPrice }}
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <small>Data da venda</small>
                    <p class="text-gray-800">
                      {{ saleDate }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Fechar
            </button>
          </div> -->
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
    sale: Object
  },

  computed: {
    saleSubtotal() {
      return this.sale.price * this.sale.quantity;
    },

    salePrice() {
      let total = this.saleSubtotal;
      // if (this.isDelivery) {
      //   total += this.sale.delivery_price;
      // }
      return formatMoney(total / 100);
    },

    deliveryPrice() {
      if (this.isDelivery) {
        return formatMoney(this.sale.delivery_price / 100);
      }
      return formatMoney(0);
    },

    receivedPrice() {
      const received = this.saleSubtotal - this.sale.tax - this.sale.comission;
      return formatMoney(received / 100);
    },

    isDelivery() {
      return this.sale.delivery_type === "delivery";
    },

    comissionPrice() {
      return formatMoney(this.sale.comission / 100);
    },

    saleDate() {
      return formatDate(this.sale.created_at, true);
    }
  },

  methods: {
    openModal() {
      $(`#sale-modal-${this.sale.id}`).modal("show");
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
