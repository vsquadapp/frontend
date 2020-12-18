<template>
  <div class="card mb-4 w-100 pt-3">
    <div class="text-center">
      <img
        v-if="product.images.length"
        class="product-image"
        :src="product.images[0].image"
      />
      <img v-else class="product-image" src="medias/alt-photo.png" alt="" />
    </div>
    <hr class="mb-0" />
    <div
      class="d-flex flex-column card-body"
      :class="{ 'out-stock': outStock }"
    >
      <div class="mb-3">
        <h4 class="text-gray-900 mb-0">
          {{ productPrice }}
        </h4>
        <small>comissão de {{ comissionPrice }} por venda</small>
      </div>
      <div>
        <p class="text-gray-900">
          {{ product.name }}
        </p>
      </div>
      <div class="mt-auto mb-2">
        <strong>{{ product.ordered }} vendidos</strong>
      </div>
      <div>
        <span class="font-weight-light"
          >{{ product.quantity }} disponíveis</span
        >
      </div>
    </div>
    <div class="settings-block p-2">
      <button class="btn btn-link text-gray-700">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="options-block">
        <ul class="options list-group">
          <li class="list-group-item" @click="editProduct">Editar produto</li>
          <li class="list-group-item" @click="removeProduct(product.id)">
            Remover
          </li>
        </ul>
      </div>
    </div>

    <div v-if="outStock" class="out-stock-badge">
      <h2>
        <span class="badge badge-secondary">Esgotado</span>
      </h2>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/products";
import formatMoney from "@/utils/formatMoney";

export default {
  props: {
    product: Object
  },

  computed: {
    productPrice() {
      return formatMoney(this.product.price / 100);
    },

    comissionPrice() {
      return formatMoney(this.product.comission_value / 100);
    },

    outStock() {
      return this.product.quantity === 0;
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

    async removeProduct(product_id) {
      this.$swal({
        title: `Deseja realmente excluir?`,
        text: `O produto será automaticamente removido do catálogo e deixará de ser vendido.`,
        inputAttributes: { autocapitalize: "off" },
        icon: "warning",
        reverseButtons: true,
        confirmButtonText: "Continuar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return ProductService.destroy(product_id)
            .then(() => {
              return true;
            })
            .catch(() => {
              this.$swal.showValidationMessage(
                `Não foi possível remover o produto`
              );
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then(async () => {
        await this.$swal.fire({
          icon: "success",
          title: `Produto removido com sucesso!`
        });
        this.$router.go();
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
  width: 200px;
  height: 200px;
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
</style>
