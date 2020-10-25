<template>
  <div class="card mb-4 py-3" :class="{ 'border-bottom-primary': selected }">
    <div class="card-body text-center">
      <h3 class="text-gray-900">{{ plan.title }}</h3>

      <div v-for="(item, index) of plan.items" :key="index">
        <span class="mr-2">
          <i :class="item.icon"></i>
        </span>
        <span>{{ item.text }}</span>
      </div>

      <hr />

      <div>
        <h5 class="text-gray-900">{{ finalPrice }}</h5>
        <small>Tarifa de venda</small>
      </div>
    </div>
  </div>
</template>

<script>
import formatMoney from "@/utils/formatMoney";
export default {
  props: {
    selected: Boolean,
    plan: Object,
    price: Number
  },

  computed: {
    finalPrice() {
      if (!this.price) return "-";
      return formatMoney((this.price * this.plan.tax) / 100);
    }
  },

  methods: {
    formatMoney(value) {
      return formatMoney(value);
    }
  }
};
</script>
