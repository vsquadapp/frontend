<template>
  <div class="card mb-4 py-3" :class="{ 'border-bottom-primary': selected }">
    <div class="card-body text-center">
      <h3 class="text-gray-900">{{ title }}</h3>

      <div v-for="(item, index) of items" :key="index">
        <span class="mr-2">
          <i :class="item.icon"></i>
        </span>
        <span>{{ item.text }}</span>
      </div>

      <hr />

      <div>
        <h5 class="text-gray-900">{{ formatMoney(price) }}</h5>
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
    title: String,
    items: Array,
    price: Number
  },

  methods: {
    formatMoney(value) {
      return formatMoney(value);
    }
  }
};
</script>
