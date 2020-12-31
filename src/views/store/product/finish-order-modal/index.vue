<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title text-gray-800">Finalizar Pedido</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="closeModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <checkout-form
              :product="product"
              :quantity="quantity"
              @close="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CheckoutForm from "./checkout-form";

export default {
  props: {
    product: Object,
    quantity: [Number, String]
  },

  components: {
    CheckoutForm
  },

  methods: {
    closeModal() {
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-content {
  overflow: scroll;
}

// .modal-content {
//   height: 100%;
// }
</style>
