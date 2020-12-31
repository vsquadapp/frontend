<template>
  <form @submit.prevent="onSubmit" class="review-step">
    <div class="modal-body">
      <h6 class="mb-3">Resumo</h6>

      <div>
        <div>
          <strong>Dados do cliente</strong>
          <p>
            {{ form.customer.name }} <br />
            {{ form.customer.email }} <br />
            {{ form.customer.phone }}
          </p>
        </div>
        <hr />
      </div>
      <div>
        <div>
          <strong>Produto</strong>
        </div>
        <div>
          <p>
            {{ product.name }} <br />
            Quantidade: {{ quantity }}<br />
            Valor total: {{ totalPrice }}<br />
          </p>
        </div>
        <hr />
      </div>
      <div>
        <div>
          <strong>Forma de recebimento</strong>
          <div v-if="isPickup">
            Retirada no local <br />
            Lucidata <br />
            Av. Getúlio Vargas, 441 - Centro, Feira de Santana - BA
          </div>
          <div v-else-if="isDelivery">
            <div>
              <span>Entrega no endereço</span>
            </div>
            <div>
              {{ form.address.street }}, {{ form.address.number }},
              {{ form.address.district }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import formatMoney from "@/utils/formatMoney";

export default {
  props: {
    form: Object,
    product: Object,
    quantity: [Number, String]
  },

  computed: {
    totalPrice() {
      return formatMoney((this.product.price * this.quantity) / 100);
    },

    isPickup() {
      return this.form.address.delivery_type === "pickup";
    },

    isDelivery() {
      return this.form.address.delivery_type === "delivery";
    }
  },

  methods: {
    onSubmit() {
      this.$emit("finish");
    }
  }
};
</script>
