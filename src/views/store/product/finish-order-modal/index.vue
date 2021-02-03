<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <form @submit.prevent="onNext" class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title text-gray-800">Finalizar Pedido</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="closeModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <component
                :is="currentStepComponent"
                v-model:form="form"
                :product="product"
                :supplier="supplier"
                :quantity="quantity"
              />
            </div>
            <div class="modal-footer">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import OrderService from "@/services/orders";
import CustomerStep from "./checkout-form/CustomerStep";
import ReviewStep from "./checkout-form/ReviewStep";
import ShippingStep from "./checkout-form/ShippingStep";

const steps = [CustomerStep, ShippingStep, ReviewStep];

export default {
  props: {
    product: Object,
    supplier: Object,
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

      await this.$swal({
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
        preConfirm: () => {
          return OrderService.create(payload)
            .then(response => response.data)
            .catch(() => {
              this.$swal.fire({
                icon: "error",
                title: `Ocorreu um erro no processamento do pedido!`,
                text:
                  "Tente novamente, caso o erro continue entre em contato conosco."
              });
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      })
        .then(response => {
          const order = response.value.order_id;
          this.$swal.fire({
            icon: "success",
            title: `Pedido realizado com sucesso!`,
            html: `<p>O número do seu pedido é <b>${order}</b>.</p>
            <p>Tenha o número de seu pedido em mãos para consultar o status a qualquer momento.<p>`
          });
          this.closeModal();
        })
        .catch(() => {});

      this.submitting = false;
    },

    onNext() {
      if (this.isLastStep) return this.onSubmit();
      this.currentStep++;
    },

    onBack() {
      if (this.currentStep === 0) return false;
      this.currentStep--;
    },

    closeModal() {
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-content {
  overflow: scroll;
}

// .modal-content {
//   height: 100%;
// }
</style>
