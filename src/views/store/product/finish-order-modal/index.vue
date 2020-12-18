<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
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
              <div class="customer-step" v-show="navigation.currentStep === 0">
                <h6>Informações para contato</h6>
                <div class="form-group">
                  <label for="fullname" class="label-control text-gray-900">
                    Nome completo
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    class="form-control"
                    v-model="form.name"
                  />
                </div>
                <div class="form-group">
                  <label for="phone" class="label-control text-gray-900">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    class="form-control"
                    v-model="form.phone"
                  />
                </div>
              </div>

              <div class="shipping-step" v-show="navigation.currentStep === 1">
                <h6>Opções de recebimento</h6>

                <div class="delivery-options">
                  <div class="delivery-type-item custom-control custom-radio">
                    <input
                      type="radio"
                      id="deliveryType1"
                      name="customRadio"
                      class="custom-control-input"
                      value="1"
                      v-model="selectedDeliveryType"
                    />
                    <label
                      class="delivery-type-label custom-control-label"
                      for="deliveryType1"
                    >
                      <div class="delivery-type-label-row">
                        <table class="delivery-type-label-row-table">
                          <tr>
                            <td class="delivery-type-title text-gray-800">
                              Retirada no local
                            </td>
                            <td class="text-success delivery-type-price">
                              Gratis
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div>
                                Multicoisas
                              </div>
                              <div>
                                Av. Getúlio Vargas, 441 - Centro, Feira de
                                Santana - BA
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </label>
                  </div>
                  <div class="delivery-type-item custom-control custom-radio">
                    <input
                      type="radio"
                      id="deliveryType2"
                      name="customRadio"
                      class="custom-control-input"
                      value="2"
                      v-model="selectedDeliveryType"
                    />
                    <label
                      class="delivery-type-label custom-control-label"
                      for="deliveryType2"
                    >
                      <div class="delivery-type-label-row">
                        <table class="delivery-type-label-row-table">
                          <tr>
                            <td class="delivery-type-title text-gray-800">
                              Delivery
                            </td>
                            <td class="delivery-type-price text-gray-800">
                              R$ 10,00
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Prazo de 24 horas para entrega
                            </td>
                          </tr>
                        </table>
                      </div>
                    </label>
                  </div>
                </div>

                <div
                  v-if="selectedDeliveryType == 2"
                  class="delivery-address row"
                >
                  <div class="col-12">
                    <h6>Endereço de entrega</h6>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="cep" class="label-control">
                        Cep
                      </label>
                      <input
                        id="cep"
                        type="text"
                        class="form-control"
                        v-model="form.address.cep"
                      />
                    </div>
                  </div>
                  <div class="col-sm-12">
                    <div class="form-group">
                      <label for="street" class="label-control">
                        Endereço
                      </label>
                      <input
                        id="street"
                        type="text"
                        class="form-control"
                        v-model="form.address.street"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="neighborhood" class="label-control">
                        Bairro
                      </label>
                      <input
                        id="neighborhood"
                        type="text"
                        class="form-control"
                        v-model="form.address.neighborhood"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label for="number" class="label-control">
                        Número
                      </label>
                      <input
                        id="number"
                        type="text"
                        class="form-control"
                        v-model="form.address.number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="review-step" v-if="navigation.currentStep === 2">
                <h6 class="mb-3">Resumo</h6>

                <div>
                  <div>
                    <strong>Dados do cliente</strong>
                    <p>
                      {{ form.name }} <br />
                      {{ form.phone }}
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
                      Valor total: {{ product.price * quantity }}<br />
                    </p>
                  </div>
                  <hr />
                </div>
                <div>
                  <div>
                    <strong>Forma de recebimento</strong>
                    <div v-if="selectedDeliveryType == 1">
                      Retirada no local <br />
                      Lucidata <br />
                      Av. Getúlio Vargas, 441 - Centro, Feira de Santana - BA
                    </div>
                    <div v-else-if="selectedDeliveryType == 2">
                      Entrega no endereço <br />
                      {{ form.address.street }}, {{ form.address.number }},
                      {{ form.address.neighborhood }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                v-if="showBackButton"
                type="button"
                class="btn btn-secondary"
                @click="backButtonAction"
              >
                Voltar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="orderButtonAction"
              >
                {{ orderButtonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    product: Object,
    quantity: Number
  },

  data() {
    return {
      navigation: {
        currentStep: 0
      },
      selectedDeliveryType: null,
      form: {
        name: "",
        phone: "",
        address: {
          street: "",
          number: "",
          neighborhood: "",
          zipcode: ""
        }
      }
    };
  },

  computed: {
    orderButtonText() {
      return this.navigation.currentStep === 2 ? "Finalizar" : "Avançar";
    },

    showBackButton() {
      return this.navigation.currentStep !== 0;
    }
  },

  methods: {
    async orderButtonAction() {
      if (this.navigation.currentStep === 2) {
        await this.$swal.fire({
          icon: "success",
          title: `Pedido realizado com sucesso!`,
          text: "O número do seu pedido é #A001"
        });
        this.closeModal();
      } else {
        this.navigation.currentStep++;
      }
    },

    backButtonAction() {
      this.navigation.currentStep--;
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

// .modal-content {
//   height: 100%;
// }

.delivery-type-item {
  vertical-align: middle;
  display: flex;
  align-items: center;
  padding: 0;

  margin: 1rem 0rem;

  .delivery-type-label {
    width: 100%;

    .delivery-type-label-row {
      min-height: 80px;
      border: solid thin #e6e6e6;
      width: 100%;
      display: flex;
      padding: 2rem 2rem 2rem 3.5rem;
      align-items: center;
      border-radius: 6px;

      .delivery-type-label-row-table {
        width: 100%;
      }
    }

    &::before,
    &::after {
      top: 40%;
      left: 1.5rem;
    }

    .delivery-type-price {
      text-align: right;
      font-weight: 600;
      white-space: nowrap;
    }
  }

  input[type="radio"]:checked + label .delivery-type-label-row {
    background: #e6e6e6;
  }
}
</style>
