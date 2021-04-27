<template>
  <div>
    <h6>Opções de recebimento</h6>

    <div class="delivery-options">
      <div class="delivery-type-item custom-control custom-radio">
        <input
          type="radio"
          id="deliveryType1"
          name="deliveryType"
          class="custom-control-input"
          value="pickup"
          v-model="address.delivery_type"
          required
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
                    {{ supplier.store_name }}
                  </div>
                  <div>
                    {{ supplier.address.street }},
                    {{ supplier.address.number }} -
                    {{ supplier.address.district }},
                    {{ supplier.address.city }} -
                    {{ supplier.address.state }}
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
          name="deliveryType"
          class="custom-control-input"
          value="delivery"
          v-model="address.delivery_type"
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
                  {{ deliveryPrice }}
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

    <fieldset
      :disabled="searchingCep"
      v-if="address.delivery_type === 'delivery'"
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
            v-model="address.zipcode"
            @blur="searchCep"
            v-maska="'#####-###'"
          />
        </div>
      </div>

      <div class="col-sm-6">
        <div class="form-group">
          <label for="street" class="label-control">
            Endereço
          </label>
          <input
            id="street"
            type="text"
            class="form-control"
            v-model="address.street"
            required
          />
        </div>
      </div>

      <div class="col-sm-6">
        <div class="form-group">
          <label for="complement" class="label-control">
            Complemento
          </label>
          <input
            id="complement"
            type="text"
            class="form-control"
            v-model="address.complement"
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
            v-model="address.number"
            required
          />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label for="district" class="label-control">
            Bairro
          </label>
          <input
            id="district"
            type="text"
            class="form-control"
            v-model="address.district"
            required
          />
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <label for="city" class="label-control">
            Cidade
          </label>
          <input
            id="city"
            type="text"
            class="form-control"
            v-model="address.city"
            required
          />
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import * as cep from "cep-promise";
import formatMoney from "@/utils/formatMoney";

export default {
  props: {
    form: Object,
    supplier: Object,
    product: Object
  },

  data() {
    return {
      searchingCep: false,
      address: {
        street: "",
        number: "",
        complement: "",
        district: "",
        city: "",
        zipcode: "",
        state: "BA",
        country: "Brasil",
        delivery_type: null
      }
    };
  },

  mounted() {
    this.fillForm(this.form.address);
  },

  computed: {
    deliveryPrice() {
      if (this.product.delivery_price) {
        return formatMoney(this.product.delivery_price / 100);
      }
      return "";
    }
  },

  methods: {
    async searchCep() {
      this.searchingCep = true;
      try {
        const response = await cep(this.address.zipcode);
        this.address.city = response.city;
        this.address.street = response.street;
        this.address.district = response.neighborhood;
      } catch (err) {
        console.error("cep inválido");
      }
      this.searchingCep = false;
    },

    fillForm(address) {
      this.address.street = address.street;
      this.address.number = address.number;
      this.address.complement = address.complement;
      this.address.district = address.district;
      this.address.city = address.city;
      this.address.zipcode = address.zipcode;
      this.address.delivery_type = address.delivery_type;
    },

    onSubmit() {
      this.$emit("next");
    }
  },

  watch: {
    address: {
      deep: true,
      handler() {
        const form = {
          ...this.form,
          address: this.address
        };
        this.$emit("update:form", form);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.delivery-type-item {
  vertical-align: middle;
  display: flex;
  align-items: center;
  padding: 0;

  margin: 1rem 0rem;

  .delivery-type-label {
    cursor: pointer;
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
