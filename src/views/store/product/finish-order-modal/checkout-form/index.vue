<template>
  <component
    :is="currentStepComponent"
    v-model:form="form"
    :product="product"
    :quantity="quantity"
    @back="onBack"
    @next="onNext"
    @finish="onSubmit"
  >
    <button
      v-if="!isFirstStep"
      type="button"
      class="btn btn-secondary"
      @click="onBack"
    >
      Voltar
    </button>
    <button
      v-if="isLastStep"
      type="submit"
      class="btn btn-primary"
      :disabled="submitting"
    >
      Finalizar
    </button>
    <button v-else type="submit" class="btn btn-primary">
      Avançar
    </button>
  </component>
</template>

<script>
import { mapGetters } from "vuex";
import OrderService from "@/services/orders";
import CustomerStep from "./CustomerStep";
import ReviewStep from "./ReviewStep";
import ShippingStep from "./ShippingStep";

const steps = [CustomerStep, ShippingStep, ReviewStep];

export default {
  props: {
    product: Object,
    quantity: [Number, String]
  },

  components: {
    CustomerStep,
    ReviewStep,
    ShippingStep
  },

  data() {
    return {
      currentStep: 0,
      submitting: false,
      form: {
        customer: {
          name: "",
          email: "",
          phone: ""
        },
        address: {
          street: "",
          number: "",
          district: "",
          zipcode: "",
          city: "",
          state: "BA",
          country: "Brasil",
          complement: "",
          delivery_type: null
        }
      }
    };
  },

  computed: {
    ...mapGetters(["store"]),

    currentStepComponent() {
      return steps[this.currentStep];
    },

    isFirstStep() {
      return this.currentStep === 0;
    },

    isLastStep() {
      return this.currentStep === steps.length - 1;
    },

    payload() {
      return {
        seller_id: this.store.id,
        product_id: this.product.id,
        quantity: this.quantity,
        delivery_type: this.form.address.delivery_type,
        client: this.form.customer,
        address: this.form.address
      };
    }
  },

  methods: {
    async onSubmit() {
      if (!this.isLastStep) return false;

      this.submitting = true;

      const payload = this.payload;

      this.$swal({
        title: "Deseja realmente finalizar o pedido?",
        inputAttributes: {
          autocapitalize: "off"
        },
        icon: "info",
        reverseButtons: true,
        confirmButtonText: "Sim",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => OrderService.create(payload),
        allowOutsideClick: () => !this.$swal.isLoading()
      })
        .then(response => {
          const order = response.value.data.order_id;
          this.$swal.fire({
            icon: "success",
            title: `Pedido realizado com sucesso!`,
            text: `O número do seu pedido é #${order}`
          });
        })
        .catch(() => {
          this.$swal.fire({
            icon: "error",
            title: `Ocorreu um erro no processamento do pedido!`,
            text:
              "Tente novamente, caso o erro continue entre em contato conosco."
          });
        });
      this.submitting = false;
      this.closeModal();
    },

    onNext() {
      if (this.isLastStep) return false;
      this.currentStep++;
    },

    onBack() {
      if (this.currentStep === 0) return false;
      this.currentStep--;
    },

    closeModal() {
      this.$emit("close");
    }
  }
};
</script>
