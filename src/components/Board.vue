<template>
  <div
    class="board-card card shadow h-100 py-2"
    :class="[{ clickable: redirectTo }, `border-left-${color}`]"
    @click="redirect"
  >
    <div class="card-body">
      <div class="row no-gutters align-items-center">
        <div class="col mr-2">
          <div
            :class="
              `text-xs font-weight-bold text-${color} text-uppercase mb-1`
            "
          >
            {{ title }}
          </div>
          <div class="h5 mb-0 font-weight-bold text-gray-800">
            <div
              v-if="loading"
              :class="`spinner-border text-${color}`"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <span v-else>
              {{ value }}
            </span>
          </div>
        </div>
        <div class="col-auto">
          <i :class="`${icon} fa-2x text-gray-300`"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: false
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false
    },
    redirectTo: {
      type: [String, Object],
      required: false
    }
  },

  methods: {
    redirect() {
      if (!this.redirectTo) return false;
      this.$router.push(this.redirectTo);
    }
  }
};
</script>

<style lang="scss" scoped>
.board-card {
  &.clickable {
    transition: box-shadow 0.2s ease-in-out;

    &:hover,
    &:focus,
    &:active {
      cursor: pointer;
      box-shadow: 0 0.15rem 1rem 0 rgba(58, 59, 69, 0.4) !important;
    }
  }
}
</style>
