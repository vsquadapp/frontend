<template>
  <div class="card mb-4 w-100 pt-3">
    <div class="text-center">
      <img class="product-image" :src="product.img" />
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
        <span class="font-weight-light">{{ product.stock }} disponíveis</span>
      </div>
    </div>
    <div class="settings-block p-2">
      <button class="btn btn-link text-gray-700">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="options-block">
        <ul class="options list-group">
          <li
            class="list-group-item"
            data-toggle="modal"
            :data-target="`#image-modal-${product.id}`"
          >
            Gerar Imagem
          </li>
          <li class="list-group-item" @click="remove">Remover do catálogo</li>
        </ul>
      </div>
    </div>

    <div v-if="outStock" class="out-stock-badge">
      <h2>
        <span class="badge badge-secondary">Esgotado</span>
      </h2>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      :id="`image-modal-${product.id}`"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="`image-modal-${product.id}`"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <product-template
            :id="`image-content-${product.id}`"
            :product="product"
          />
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="generateImage"
            >
              Gerar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductTemplate from "./ProductTemplate";
import formatMoney from "@/utils/formatMoney";
import * as htmlToImage from "html-to-image";

export default {
  props: {
    product: Object
  },

  components: {
    ProductTemplate
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
    async generateImage() {
      const node = `#image-content-${this.product.id}`;
      htmlToImage.toPng(document.querySelector(node)).then(function(dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      });
    },

    remove() {
      this.$swal({
        title: "Deseja realmente remover o produto do seu catálogo?",
        inputAttributes: {
          autocapitalize: "off"
        },
        icon: "warning",
        reverseButtons: true,
        confirmButtonText: "Sim",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(true);
            }, 500);
          })
            .then(() => {
              return true;
            })
            .catch(error => {
              this.$swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then(() => {
        this.$swal.fire({
          icon: "success",
          title: `Produto removido com sucesso!`
        });
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
