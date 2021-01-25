<template>
  <div class="card product-item mb-4 w-100 pt-3" @click="openProduct">
    <div class="text-center">
      <img
        v-if="product.images.length"
        class="product-image"
        :src="product.images[0].image"
      />
      <img v-else class="product-image" src="medias/alt-photo.png" alt="" />
    </div>
    <hr class="mb-0" />
    <div class="d-flex flex-column card-body p-2 pb-3 p-lg-3">
      <div class="mb-3">
        <p class="text-gray-900 mb-0 mt-3 product-value">
          {{ productPrice }}
        </p>
      </div>
      <div>
        <p class="product-name text-gray-700">
          {{ product.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import formatMoney from "@/utils/formatMoney";

export default {
  props: {
    product: Object
  },

  computed: {
    productPrice() {
      return formatMoney(this.product.price / 100);
    }
  },

  methods: {
    openProduct() {
      this.$router.push({
        name: "Store.Product.Details",
        params: {
          id: this.product.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.product-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.product-name {
  font-size: 14px;
}

.product-value {
  font-size: 24px;
  font-weight: 400;
  line-height: 14px;
}

.product-item {
  cursor: pointer;
  transition: all 0.3s ease-in-out 0s;

  &:hover {
    box-shadow: 0 7px 16px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border-color: white;
  }
}
</style>
