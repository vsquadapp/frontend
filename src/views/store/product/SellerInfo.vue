<template>
  <div class="click-here" @click="redirectToSeller">
    <div>
      <h3 class="title mb-3">VISITE MINHA LOJA!</h3>
    </div>

    <div class="seller-info">
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
.click-here {
  cursor: pointer;

  &:hover {
    .title,
    .seller-name,
    .seller-official {
      color: #858796 !important;
    }
  }
}

.title {
  font-size: 22px;
  font-weight: 600;
  color: #000;
  transition: color 0.3s ease;
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
</style>
