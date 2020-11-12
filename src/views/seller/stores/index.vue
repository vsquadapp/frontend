<template>
  <page title="Lojas em destaque">
    <div class="mb-5">
      <div class="grid">
        <div class="grid-row">
          <div class="store-item" @click="openStore(1)">
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              Rocco
            </div>
          </div>
          <div class="store-item" @click="openStore(1)">
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              Rocco
            </div>
          </div>
          <div class="store-item" @click="openStore(1)">
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              Rocco
            </div>
          </div>
          <div class="store-item d-none d-sm-flex">
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              Rocco
            </div>
          </div>
        </div>
        <div class="grid-row">
          <div class="store-item" @click="openStore(1)">
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              Rocco
            </div>
          </div>
          <div class="store-item" @click="openStore(1)">
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              Rocco
            </div>
          </div>
          <div class="store-item" @click="openStore(1)">
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              Rocco
            </div>
          </div>
          <div class="store-item d-none d-sm-flex">
            <img
              class="store-brand"
              src="https://http2.mlstatic.com/storage/official-stores-images/rocco/logo201901070749.jpg"
            />
            <div class="store-name text-gray-900">
              Rocco
            </div>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";

export default {
  components: { Page },
  methods: {
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
