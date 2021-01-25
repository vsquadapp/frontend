<template>
  <page title="" class="pb-3">
    <div v-if="product" class="row">
      <div class="col-12 col-lg-8">
        <div class="card p-4 h-100">
          <div class="row">
            <div class="col-12 block-image">
              <div class="row">
                <div
                  v-if="product.images.length"
                  class="col-sm-2 product-images"
                >
                  <div
                    v-for="(image, index) of product.images"
                    :key="index"
                    class="thumb"
                  >
                    <img :src="image.image" />
                  </div>
                </div>
                <div class="col-sm-9 text-center block-main-image">
                  <img
                    v-if="product.images.length"
                    class="main-image"
                    :src="product.images[0].image"
                  />
                  <img
                    v-else
                    class="main-image"
                    src="medias/alt-photo.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div class="block-description mb-3">
            <h4 class="text-gray-900">Descrição</h4>
            <p class="product-description">
              {{ product.description }}
            </p>
          </div>

          <div v-if="product?.attributes" class="block-details mb-3">
            <h4 class="text-gray-900">Características principais</h4>
            <table class="table table-borderless table-striped">
              <tbody>
                <tr v-for="(info, index) of product.attributes" :key="index">
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
          <h5 class="text-gray-900 mb-4">{{ product.name }}</h5>

          <div class="block-comission text-gray-900 mb-3">
            <h3 class="comission-price mb-0">{{ comissionPrice }}</h3>
            <small class="comission-label">em comissão por venda</small>
          </div>

          <div class="block-price my-3">
            <h6 class="product-price mb-0">{{ productPrice }}</h6>
            <small class="product-price-label">valor do produto</small>
          </div>

          <div class="block-delivery my-3">
            <h6>Opções de entrega</h6>
            <table class="table table-borderless table-striped">
              <tbody v-if="product.delivery_type === 'pickup'">
                <tr>
                  <td>Retirada pessoalmente</td>
                  <td class="text-right font-weight-bold">
                    <span
                      v-if="product.delivery_price === 0"
                      class="text-success"
                    >
                      Grátis
                    </span>
                    <span v-else>{{ product.delivery_price }}</span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="product.delivery_type === 'delivery'">
                <tr>
                  <td>Entrega</td>
                  <td class="text-right font-weight-bold">
                    <span
                      v-if="product.delivery_price === 0"
                      class="text-success"
                    >
                      Grátis
                    </span>
                    <span v-else>{{ deliveryPrice }}</span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="product.delivery_type === 'all'">
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
                      v-if="product.delivery_price === 0"
                      class="text-success"
                    >
                      Grátis
                    </span>
                    <span v-else>{{ deliveryPrice }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pt-3">
            <p>{{ quantityText }}</p>
          </div>

          <div>
            <button
              class="btn btn-lg btn-block btn-primary"
              @click="addToCatalog"
            >
              <span
                v-if="addToCatalogLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              <span v-else>
                Adicionar ao catálogo
              </span>
            </button>
          </div>
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
import { mapGetters } from "vuex";

import Page from "@/components/Page";

import formatMoney from "@/utils/formatMoney";

import ProductsService from "@/services/products";
import SellerService from "@/services/sellers";

export default {
  components: { Page },

  props: { id: String },

  data() {
    return {
      product: null,
      addToCatalogLoading: false
    };
  },

  mounted() {
    this.loadProduct();
  },

  computed: {
    ...mapGetters(["seller"]),

    productPrice() {
      if (this.product) {
        return formatMoney(this.product.price / 100);
      }
      return null;
    },

    comissionPrice() {
      return formatMoney(this.product.comission_price / 100);
    },

    deliveryPrice() {
      return formatMoney(this.product.delivery_price / 100);
    },

    quantityText() {
      const quantity = this.product.quantity;
      return quantity === 1
        ? `${quantity} dispoível`
        : `${quantity} disponíveis`;
    }
  },

  methods: {
    async loadProduct() {
      const response = await ProductsService.getById(this.id);
      this.product = response.data;
      if (this.product?.attributes) {
        this.product.attributes = JSON.parse(this.product.attributes);
      }
    },

    async addToCatalog() {
      this.addToCatalogLoading = true;

      try {
        await SellerService.addProduct(this.seller.id, this.id);
        await this.$swal({
          title: "Produto adicionado ao catalogo!",
          text:
            "O produto foi adicionado ao seu catálogo e já está disponível para venda!",
          icon: "success"
        });
        this.$router.push({ name: "Seller.Dashboard" });
      } catch (err) {
        await this.$swal({
          title: "Ocorreu um erro!",
          text:
            "Não foi possível adicionar o produto ao catálogo, tente novamente mais tarde!",
          icon: "error"
        });
      }

      this.addToCatalogLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.block-comission {
  position: relative;
  font-weight: bold;

  .comission-label {
    position: absolute;
    bottom: -12px;
  }

  .comission-price {
    font-size: 36px;
  }
}

.block-price {
  position: relative;

  .product-price {
    font-size: 18px;
  }

  .product-price-label {
    position: absolute;
    bottom: -14px;
  }
}

.thumb {
  border: solid thin rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  height: 60px;
  width: 60px;
  margin: 1rem 0rem;
  padding: 0.1rem;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  &:hover {
    border-color: #3a3b45;
  }
}

.block-main-image {
  width: 100%;
  height: 300px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media only screen and (max-width: 575px) {
  .product-images {
    display: flex;

    .thumb {
      margin-right: 0.5rem;
    }
  }
}

.product-description {
  white-space: break-spaces;
}
</style>
