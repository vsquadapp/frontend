<template>
  <div class="px-2">
    <div class="card mb-4 w-100 pt-3 product-item" @click="openProduct">
      <div class="text-center">
        <img class="product-image" :src="product.img" />
      </div>
      <hr class="mb-0" />
      <div
        class="d-flex flex-column card-body p-2 pb-3 p-lg-3"
        :class="{ 'out-stock': outStock }"
      >
        <div class="mb-3">
          <p class="text-gray-900 mb-0 mt-3 comission-value">
            {{ comissionPrice }}
            <br />
            <small>de comissão por venda</small>
          </p>
        </div>
        <div>
          <p class="product-name text-gray-700">
            {{ product.name }}
          </p>
        </div>
        <p class="product-price mb-0 mt-auto">
          {{ productPrice }}
        </p>
      </div>

      <div v-if="outStock" class="out-stock-badge">
        <h2>
          <span class="badge badge-secondary">Esgotado</span>
        </h2>
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
      return formatMoney(this.product.price);
    },

    comissionValue() {
      if (this.product.comission_type === "percentage") {
        return this.product.comission_value * this.product.price;
      } else {
        return this.product.comission_value;
      }
    },

    comissionPrice() {
      return formatMoney(this.comissionValue);
    },

    outStock() {
      return this.product.stock === 0;
    }
  },

  methods: {
    editProduct() {
      this.$router.push({
        name: "Supplier.EditProduct",
        params: {
          id: this.product.id
        }
      });
    },
    openProduct() {
      this.$router.push({
        name: "Seller.ViewProduct",
        params: {
          id: this.product.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
}

.settings-block {
  position: absolute;
  top: 0px;
  right: 0px;

  button {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }

  button.focus,
  button:focus {
    border: unset !important;
    box-shadow: unset !important;
  }

  &:hover .btn {
    color: #3a3b45 !important;
  }

  .options-block {
    position: relative;
  }

  .options-block .options {
    position: absolute;
    right: 0px;
    min-width: 200px;
    display: none;
  }

  &:focus-within .options-block .options,
  &:active .options-block .options {
    display: block;
  }

  .list-group-item:hover {
    color: #3a3b45;
    cursor: pointer;
  }
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.out-stock {
  opacity: 0.3;
}

.out-stock-badge {
  position: absolute;
  text-align: center;
  top: 40%;
  width: 100%;
}

.product-name {
  font-size: 14px;
}

.comission-value {
  font-size: 18px;
  font-weight: bold;
  line-height: 14px;
  small {
    font-size: 12px;
  }
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
