<template>
  <div class="image-content">
    <div class="p-4 h-100">
      <div class="row">
        <div class="col-sm-6 block-image">
          <div class="row">
            <div class="col-sm-2 product-images">
              <div class="thumb">
                <img :src="product.img" />
              </div>
              <div class="thumb">
                <img :src="product.img" />
              </div>
            </div>
            <div class="col-sm-10 text-center block-main-image">
              <img class="main-image" :src="product.img" />
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="p-4">
            <h5 class="text-gray-900 mb-4">{{ product.name }}</h5>

            <div class="block-price my-3">
              <h2 class="text-gray-900 product-price mb-0">R$ 1000,00</h2>
            </div>

            <div class="block-delivery my-3">
              <h6>Formas de envio</h6>
              <table class="table table-borderless table-striped">
                <tbody v-if="product.deliveryType === '1'">
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
                <tbody v-if="product.deliveryType === '2'">
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
                <tbody v-if="product.deliveryType === '3'">
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
          </div>
        </div>
      </div>

      <hr />
      <div class="row col-12">
        <div class="block-description mb-3">
          <h4 class="text-gray-900">Descrição</h4>
          <p>
            {{ product.description }}
          </p>
        </div>

        <div v-if="product.infos.length" class="block-details mb-3">
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
  </div>
</template>

<script>
export default {
  props: { product: Object }
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

  .product-price-label {
    position: absolute;
    bottom: -14px;
  }
}

.thumb {
  height: 70px;
  width: 70px;
  margin: 1rem 0rem;
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

.image-content {
  width: 100%;
  background: white;
}
</style>
