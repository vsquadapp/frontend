<template>
  <page title="Lojas oficiais">
    <div v-if="loading" class="d-flex justify-content-center">
      <div :class="`spinner-border text-${color}`" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else-if="stores.length" class="mb-5">
      <div class="grid">
        <div class="grid-row">
          <div
            v-for="(store, index) of stores"
            :key="index"
            class="store-item d-none d-sm-flex"
          >
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              {{ store.store_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h4>Nenhuma loja encontrada.</h4>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import SupplierService from "@/services/suppliers";

export default {
  components: { Page },

  data() {
    return {
      stores: [],
      loading: true
    };
  },

  mounted() {
    this.loadStores();
  },

  methods: {
    async loadStores() {
      this.loading = true;
      try {
        const stores = await SupplierService.officials();
        this.stores = stores.data.data;
      } catch (error) {
        this.stores = [];
      }
      this.loading = false;
    },

    openStore(id) {
      this.$router.push({
        name: "Seller.StoreProducts",
        params: {
          id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  background: white;
  border-radius: 6px;
  width: 100%;
  max-width: 800px;

  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.1);

  .grid-row {
    display: flex;
    flex-flow: wrap;
  }
}

.store-item {
  height: 200px;
  width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover .store-name {
    opacity: 1;
  }

  .store-name {
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
  }

  .store-brand {
    height: 50%;
    width: 50%;
    object-fit: contain;
  }
}
</style>
