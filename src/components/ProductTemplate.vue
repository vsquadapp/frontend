<template>
  <div class="image-content">
    <div class="p-4">
      <div class="row">
        <div class="col-12 block-image">
          <div class="row">
            <div class="col-sm-3 product-images">
              <div class="thumb" v-if="product.images.length >= 2">
                <img :src="product.images[1].image" />
              </div>
              <div class="thumb" v-if="product.images.length >= 3">
                <img :src="product.images[2].image" />
              </div>
            </div>
            <div class="col-sm-9 text-center" v-if="product.images.length >= 1">
              <div class="block-main-image">
                <img class="main-image" :src="product.images[0].image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row col-12">
        <div class="">
          <h5 class="text-gray-900 mb-4">{{ product.name }}</h5>

          <div class="block-price my-3">
            <h2 class="text-gray-900 product-price mb-0">
              {{ productPrice }}
            </h2>
          </div>
        </div>
      </div>

      <hr />
      <div class="row col-12">
        <div class="block-description mb-3">
          <h4 class="text-gray-900">Descrição</h4>
          <p class="product-description">
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatMoney from "@/utils/formatMoney";

export default {
  props: { product: Object },

  computed: {
    productPrice() {
      return formatMoney(this.product.price / 100);
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

  .product-price-label {
    position: absolute;
    bottom: -14px;
  }
}

.thumb {
  height: 150px;
  width: 150px;
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
  width: 400px;
  height: 400px;
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

.product-description {
  text-align: justify;
  white-space: break-spaces;
}
</style>
