<template>
  <div
    class="modal fade bd-example-modal-lg"
    data-backdrop="static"
    data-keyboard="false"
    :id="`product-modal-${product.id}`"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ product.name }}
          </h5>

          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-striped table-borderless">
              <tr>
                <th>Produto</th>
                <td>{{ product.name }}</td>
                <td>{{ product.quantity }} em estoque</td>
              </tr>
              <tr>
                <th>Criado em</th>
                <td>{{ product.name }}</td>
                <td>{{ createdAt }}</td>
              </tr>
              <tr>
                <th>Valor do produto</th>
                <td colspan="2">{{ productPrice }}</td>
              </tr>
              <tr v-if="canDelivery">
                <th>Valor da entrega</th>
                <td colspan="2">{{ productPrice }}</td>
              </tr>
              <tr v-if="canDelivery">
                <th>Valor da comissão</th>
                <td colspan="2">{{ comissionPrice }}</td>
              </tr>
              <tr>
                <th>Lojista</th>
                <td>{{ product.supplier.name }}</td>
                <td>{{ product.supplier.phone }}</td>
              </tr>
              <tr>
                <th>Descrição</th>
                <td colspan="2">{{ product.description }}</td>
              </tr>
              <tr>
                <td colspan="3">
                  <div class="product-images">
                    <div
                      class="product-image-container"
                      v-for="image of product.images"
                      :key="image.id"
                    >
                      <img
                        class="product-image p-1"
                        :src="image.image"
                        alt=""
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" @click="remove">
            Apagar Produto
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import formatMoney from "@/utils/formatMoney";
import formatDate from "@/utils/formatDate";
import AdminService from "@/services/admin";

export default {
  props: ["product", "show"],

  emits: ["update:show"],

  methods: {
    openModal() {
      $(`#product-modal-${this.product.id}`).modal("show");
    },

    close() {
      $(`#product-modal-${this.product.id}`).modal("hide");
    },

    remove() {
      this.$swal({
        title: "Deseja realmente remover o produto?",
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
          return AdminService.removeProduct(this.product.id)
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
          this.$swal
            .fire({
              icon: "success",
              title: `Produto removido com sucesso!`
            })
            .then(async () => {
              this.close();
              this.$parent.$parent.$emit("update-list");
            });
        }
      });
    }
  },

  computed: {
    productPrice() {
      return formatMoney(this.product.price / 100);
    },

    deliveryPrice() {
      if (!this.canDelivery()) {
        return false;
      }
      return formatMoney(this.product.delivery_price / 100);
    },

    comissionPrice() {
      return formatMoney(this.product.comission_price / 100);
    },

    canDelivery() {
      if (this.product.delivery_type == "all") return true;
      if (this.product.delivery_type == "delivery") return true;
      return false;
    },

    createdAt() {
      return formatDate(this.product.created_at, true);
    }
  },

  watch: {
    show(value) {
      if (value) {
        this.openModal();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.product-images {
  display: flex;
  flex-wrap: wrap;

  .product-image-container {
    width: 100px;
    height: 100px;

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
