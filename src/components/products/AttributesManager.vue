<template>
  <div>
    <div class="form-group">
      <div>
        <label class="title mb-0">
          Características Gerais
        </label>
      </div>
      <small class="mt-0">
        Informações mais específicas sobre o produto, como por exemplo, tamanho,
        voltagem, garantia, etc.
      </small>
    </div>

    <div class="row">
      <div class="col-sm-3" v-for="(attr, index) of attribute" :key="index">
        <h5 class="mb-0 text-gray-900">{{ attr.key }}</h5>
        <p class="">{{ attr.value }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <form class="form-inline" @submit.prevent="addAttribute">
          <div class="form-group mb-2">
            <input
              type="text"
              required
              class="form-control"
              placeholder="Característica"
              v-model="currentAttribute.key"
            />
          </div>
          <div class="form-group mx-sm-3 mb-2 mr-2">
            <input
              type="text"
              required
              class="form-control"
              placeholder="Descrição"
              v-model="currentAttribute.value"
            />
          </div>
          <button type="submit" class="btn btn-primary mb-2">
            <i class="fas fa-plus"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialAttributes: String
  },

  data() {
    return {
      currentAttribute: {
        key: "",
        value: ""
      },
      attribute: []
    };
  },

  mounted() {
    if (this.initialAttributes) {
      this.attribute = JSON.parse(this.initialAttributes);
    }
  },

  methods: {
    addAttribute() {
      if (!this.currentAttribute.key || !this.currentAttribute.value) {
        return false;
      }
      this.attribute.push({ ...this.currentAttribute });
      this.currentAttribute = { key: "", value: "" };
      this.$emit("change", this.attribute);
    }
  }
};
</script>

<style></style>
