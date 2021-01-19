<template>
  <div
    class="modal fade"
    id="searchOrderModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="searchOrderModalLabel"
    aria-hidden="true"
  >
    <form @submit.prevent="search">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="searchOrderModalLabel">
              Acompanhar pedido
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
            <div v-if="!order" class="from-group">
              <label class="label-control" for="order-code">
                Número do pedido
              </label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': !!error }"
                placeholder="Digite o número do pedido"
                v-model="form.order_code"
                required
              />
              <div id="validationServer03Feedback" class="invalid-feedback">
                {{ error }}
              </div>
            </div>
            <div v-else>
              <div>
                <h5 class="text-gray-800">Status do pedido</h5>
                <p :class="`order-${order.status}`">
                  {{ orderStatus }}
                </p>
              </div>
              <div>
                <h5 class="text-gray-800">Valor do pedido</h5>
                <p class="text-gray-900">
                  {{ orderPrice }}
                </p>
              </div>
              <div>
                <h5 class="text-gray-800">Data do pedido</h5>
                <p class="text-gray-900">
                  {{ orderDate }}
                </p>
              </div>
              <div>
                <h5 class="text-gray-800">Forma de entrega</h5>
                <p class="text-gray-900">{{ orderDeliveryType }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              :disabled="searching"
            >
              <span v-if="!order">Cancelar</span>
              <span v-else>Ok</span>
            </button>
            <button
              v-if="!order"
              type="submit"
              class="btn btn-primary"
              :disabled="searching"
            >
              Buscar pedido
              <div
                v-if="searching"
                class="spinner-border spinner-border-sm mb-1"
                role="status"
              ></div>
            </button>
            <button
              v-else
              type="submit"
              class="btn btn-primary"
              @click="resetSearch"
            >
              Buscar novamente
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import OrderService from "@/services/orders";
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";

export default {
  data() {
    return {
      form: {
        order_code: ""
      },
      order: null,
      error: "",
      searching: false
    };
  },

  computed: {
    orderDate() {
      return formatDate(this.order.created_at);
    },

    orderPrice() {
      if (this.order) {
        return formatMoney(this.order.price / 100);
      } else {
        return "";
      }
    },

    orderStatus() {
      if (!this.order) return "";
      if (this.order.status === "completed") return "Pedido finalizado";
      if (this.order.status === "pending") return "Pedido pendente";
      return "";
    },

    orderDeliveryType() {
      if (!this.order) return "";
      if (this.order.delivery_type === "pickup") return "Retirada no local";
      return "Entrega via delivery";
    }
  },

  methods: {
    async search() {
      this.searching = true;
      this.error = "";
      try {
        const response = await OrderService.showByCode(this.form.order_code);
        this.order = response.data;
      } catch (err) {
        if (err?.response?.status === 412) {
          this.error = "Número de pedido não encontrado.";
        } else {
          this.error = "Não foi possível encontrar o pedido.";
        }
      }
      this.searching = false;
    },

    resetSearch() {
      this.order = null;
      this.error = "";
      this.searching = false;
    }
  }
};
</script>

<style scoped lang="scss">
.order-completed {
  color: #1cc88a;
}

.order-pending {
  color: #f6c23e;
}
</style>
