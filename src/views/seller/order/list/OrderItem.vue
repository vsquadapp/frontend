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
    <td class="text-right">{{ receivedPrice }}</td>
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
                <h5 class="text-gray-900 mb-0">
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

                <div class="order-status mb-2">
                  <span class="text-warning">
                    Aguardando pagamento <i class="far fa-clock"></i>
                  </span>
                </div>

                <div>
                  <small>Cliente</small>
                  <p>
                    {{ order.client.name }}
                  </p>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="px-3">
                    <small>Valor a receber</small>
                    <p class="text-gray-900">
                      {{ receivedPrice }}
                    </p>
                  </div>
                  <div class="px-3">
                    <small>Data do pedido</small>
                    <p class="text-gray-800">
                      {{ orderDate }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
      return formatMoney(this.order.price / 100);
    },

    receivedPrice() {
      return formatMoney(this.order.comission / 100);
    },

    orderDate() {
      return formatDate(this.order.created_at, true);
    }
  },

  methods: {
    openModal() {
      $(`#order-modal-${this.order.id}`).modal("show");
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

.order-status {
  font-size: 14px;
}

.slim {
  width: 1%;
}
</style>
