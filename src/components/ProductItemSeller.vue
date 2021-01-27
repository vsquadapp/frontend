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
        <strong>{{ product.sales }} vendidos</strong>
      </div>
      <div>
        <span class="font-weight-light">
          {{ product.quantity }} disponíveis
        </span>
      </div>
    </div>
    <div class="settings-block p-2">
      <button class="btn btn-link text-gray-700">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="options-block">
        <ul class="options list-group">
          <li class="list-group-item" @click="generateImage">
            Gerar Imagem
          </li>
          <li class="list-group-item" @click="copyLink">
            Copiar link
            <span
              class="copied-badge ml-2 badge badge-success"
              :class="{
                show: showBadge
              }"
            >
              Copiado!
            </span>
            <input
              :id="`product-link-${product.id}`"
              class="product-link"
              type="text"
              :value="productLink"
            />
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

    <product-template
      :id="`image-content-${product.id}`"
      class="image-template"
      :product="product"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductTemplate from "./ProductTemplate";
import formatMoney from "@/utils/formatMoney";
import html2canvas from "html2canvas";
import canvas2image from "canvas2image-2";
import linkGenerator from "@/utils/linkGenerator";

export default {
  props: {
    product: Object
  },

  data() {
    return {
      showBadge: false
    };
  },

  components: {
    ProductTemplate
  },

  computed: {
    ...mapGetters(["seller"]),

    productPrice() {
      return formatMoney(this.product.price / 100);
    },

    comissionPrice() {
      return formatMoney(this.product.comission_price / 100);
    },

    outStock() {
      return this.product.quantity === 0;
    },

    productLink() {
      return encodeURI(
        linkGenerator.getProductLink(this.product.id, this.seller.slug)
      );
    }
  },

  methods: {
    async generateImage() {
      const element = document.getElementById(
        `image-content-${this.product.id}`
      );

      html2canvas(element).then(function(canvas) {
        canvas2image.saveAsPNG(canvas, canvas.width, canvas.height);
      });
    },

    async copyLink() {
      const copyText = document.getElementById(
        `product-link-${this.product.id}`
      );
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");

      this.showBadge = true;

      setTimeout(() => {
        this.showBadge = false;
      }, 2000);
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
      }).then(response => {
        if (response.isConfirmed) {
          this.$swal.fire({
            icon: "success",
            title: `Produto removido com sucesso!`
          });
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

  &:hover .options-block .options,
  &:focus .options-block .options,
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

.image-template {
  z-index: -1;
  position: absolute;
  width: 720px;
  min-height: 720px;
}

.product-link {
  z-index: -1;
  position: absolute;
}

.copied-badge {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s linear, opacity 0.3s linear;

  &.show {
    visibility: visible;
    opacity: 1;
  }
}
</style>
