<template>
  <page title="" class="pb-3">
    <div v-if="product" class="row">
      <div class="col-12 col-lg-8">
        <div class="card p-4 h-100">
          <div class="row">
            <product-images :product="product" />
          </div>

          <hr />

          <div class="block-description mb-3">
            <h4 class="text-gray-900">Descrição</h4>
            <p class="product-description">
              {{ product.description }}
            </p>
          </div>

          <div v-if="product?.infos?.length" class="block-details mb-3">
            <h4 class="text-gray-900">Características principais</h4>
            <table class="table table-borderless table-striped">
              <tbody>
                <tr v-for="(info, index) of product.infos" :key="index">
                  <td class="font-weight-bold">
                    {{ info.key }}
                  </td>
                  <td>
                    {{ info.value }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4 mt-3 mt-lg-0">
        <div class="card p-4">
          <div>
            <h5 class="product-name text-gray-900 mb-4">{{ product.name }}</h5>
          </div>

          <div class="my-3">
            <h6 class="product-price text-gray-900 mb-0">{{ productPrice }}</h6>
          </div>

          <div class="block-delivery my-3">
            <h6>Opções de entrega</h6>
            <table class="table table-borderless table-striped">
              <tbody v-if="product.delivery_type === '1'">
                <tr>
                  <td>Retirada pessoalmente</td>
                  <td class="text-right font-weight-bold">
                    <span
                      v-if="product.deliveryValue === 0"
                      class="text-success"
                    >
                      Grátis
                    </span>
                    <span v-else>{{ product.deliveryValue }}</span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="product.delivery_type === '2'">
                <tr>
                  <td>Entrega</td>
                  <td class="text-right font-weight-bold">
                    <span
                      v-if="product.deliveryValue === 0"
                      class="text-success"
                    >
                      Grátis
                    </span>
                    <span v-else>{{ product.deliveryValue }}</span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="product.delivery_type === '3'">
                <tr>
                  <td>Retirada pessoalmente</td>
                  <td class="text-right font-weight-bold">
                    <span class="text-success">
                      Grátis
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Entrega</td>
                  <td class="text-right font-weight-bold">
                    <span
                      v-if="product.deliveryValue === 0"
                      class="text-success"
                    >
                      Grátis
                    </span>
                    <span v-else>{{ product.deliveryValue }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pt-3 mb-3">
            <div>
              <span class="text-gray-900">Estoque disponível</span>
            </div>
            <div>
              <span>{{ productQuantity }}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  type="number"
                  class="form-control"
                  aria-describedby="quantityInvalid"
                  required
                  :class="{ 'is-invalid': checkout.error }"
                  v-model="checkout.quantity"
                />
                <div id="quantityInvalid" class="invalid-feedback">
                  {{ checkout.error }}
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              id="place-order-button"
              class="btn btn-lg btn-block btn-primary"
              @click="placeOrder"
            >
              <span
                v-if="orderLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              <span v-else>
                Comprar agora
              </span>
            </button>

            <finish-order-modal
              v-if="showFinishOrderModal"
              :product="product"
              :quantity="checkout.quantity"
              @close="onCloseFinishOrderModal"
            />
          </div>
        </div>

        <div class="card p-4 mt-3 seller-block">
          <seller-info />
        </div>
      </div>
    </div>

    <div v-else class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import SellerInfo from "./SellerInfo";
import FinishOrderModal from "./finish-order-modal";
import ProductImages from "./ProductImages";
import ProductsService from "@/services/products";
import formatMoney from "@/utils/formatMoney";

export default {
  components: { Page, SellerInfo, ProductImages, FinishOrderModal },

  props: { id: String, seller: String },

  data() {
    return {
      product: null,
      orderLoading: false,
      showFinishOrderModal: false,
      checkout: { quantity: 1 }
    };
  },

  mounted() {
    this.loadProduct();
  },

  computed: {
    productPrice() {
      if (this.product) {
        return formatMoney(this.product.price / 100);
      }
      return null;
    },

    comissionPrice() {
      return formatMoney(this.product.comission_value / 100);
    },

    productQuantity() {
      if (this.product?.quantity) {
        const quantity = this.product.quantity;
        return quantity === 1
          ? `${quantity} disponível`
          : `${quantity} disponíveis`;
      }
      return "";
    }
  },

  methods: {
    async loadProduct() {
      const response = await ProductsService.getById(this.id);
      this.product = response.data;
    },

    async placeOrder() {
      if (this.checkout.quantity > this.product.quantity) {
        this.checkout.error = "Sem estoque.";
      } else {
        this.showFinishOrderModal = true;
      }
    },

    redirectToSeller() {
      this.$router.push({ name: "Store", params: { seller: this.seller } });
    },

    onCloseFinishOrderModal() {
      this.showFinishOrderModal = false;
    }
  },

  watch: {
    "checkout.quantity"(value, oldValue) {
      if (value > this.product.quantity) {
        this.checkout.quantity = oldValue;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#place-order-button {
  font-size: 16px;
  font-weight: 600;
  padding: 0.8rem 0;
}

.product-price {
  font-size: 36px;
  font-weight: 300;
}

.product-name {
  font-size: 22px;
  font-weight: 600;
}

.product-description {
  white-space: break-spaces;
}
</style>