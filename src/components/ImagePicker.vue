<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-sm-3">
        <!-- Upload image input-->
        <input
          id="upload"
          type="file"
          @change="readURL"
          multiple=""
          class="form-control border-0"
        />

        <div class="row col-sm-12 text-center">
          <label
            id="upload-label"
            for="upload"
            class="font-weight-light text-muted"
          >
            <div class="text-center">
              <div><i class="fas fa-camera"></i></div>
              <div>Adicione ou arraste suas imagens aqui</div>
            </div>
          </label>
        </div>

        <div class="row col-sm-12 text-right">
          <label for="upload" class="btn btn-light m-0 rounded-pill btn-block">
            <small class="text-uppercase font-weight-bold text-muted">
              Choose file
            </small>
          </label>
        </div>
      </div>
      <div class="col-12 col-sm-9">
        <div
          class="image-area d-flex justify-content-start row"
          v-if="images.length"
        >
          <div
            class="image-block mr-0 mr-sm-3 mt-2 mt-sm-0 text-center"
            v-for="(image, index) of images"
            :key="index"
          >
            <span class="text-light remove-image">
              <i class="fas fa-times"></i>
            </span>
            <img id="imageResult" :src="image" alt="" height="120" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: []
    };
  },

  methods: {
    readURL(event) {
      const input = event.target;

      if (input.files && input.files[0]) {
        for (const file of input.files) {
          const reader = new FileReader();
          reader.onload = e => {
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }
};
</script>

<style scoped>
#upload {
  position: absolute;
  opacity: 0;
}

.image-block {
  position: relative;
}

.remove-image {
  position: absolute;
  right: 2px;
  top: -3px;
  cursor: pointer;
}
</style>
