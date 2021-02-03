<template>
  <div>
    <div>
      <h5 class="title text-gray-900 mb-3">Informações do vendedor</h5>
    </div>

    <div class="seller-info" @click="redirectToSeller">
      <h6 class="seller-name text-gray-900 mb-0">{{ store.slug }}</h6>
      <small>{{ store.name }}</small>
      <p class="seller-official">Loja oficial do vsquad</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["store"])
  },

  methods: {
    redirectToSeller() {
      this.$router.push({
        name: "Store.Home",
        params: { slug: this.store.slug }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.seller-block .title {
  font-size: 18px;
  font-weight: 400;
}

.seller-name {
  font-size: 20px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.seller-official {
  font-size: 14px;
  font-weight: 300;
  transition: color 0.3s ease;
}

.seller-info {
  cursor: pointer;

  &:hover {
    .seller-name,
    .seller-official {
      color: #858796 !important;
    }
  }
}
</style>
