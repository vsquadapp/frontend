<template>
  <div class="col-12 block-image">
    <div class="row">
      <div v-if="product.images.length" class="col-sm-2 product-images">
        <div
          v-for="(image, index) of product.images"
          @click="selectImage(image.image)"
          :key="index"
          class="thumb"
        >
          <img :src="image.image" />
        </div>
      </div>
      <div class="col-sm-9 text-center block-main-image">
        <img
          v-if="product.images.length"
          class="main-image"
          :src="currentImage"
        />
        <img v-else class="main-image" src="medias/alt-photo.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { product: Object },

  data() {
    return {
      currentImage: ""
    };
  },

  mounted() {
    this.selectImage(this.product?.images[0]?.image);
  },

  methods: {
    selectImage(image) {
      if (image) this.currentImage = image;
    }
  }
};
</script>

<style lang="scss" scoped>
.thumb {
  border: solid thin rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  height: 60px;
  width: 60px;
  margin: 1rem 0rem;
  padding: 0.1rem;
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
  width: 100%;
  height: 300px;
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
</style>
