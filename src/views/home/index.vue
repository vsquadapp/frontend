<template>
  <div class="container">
    <div v-if="unauthorized" class="row justify-content-center mt-5">
      <div class="col-sm-7">
        <div class="alert alert-info alert-dismissible fade show" role="alert">
          É necessário fazer <b>login</b> para utilizar o sistema.
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row justify-content-center option-item">
      <div class="col-sm-7">
        <div
          class="card o-hidden border-0 shadow-lg my-5"
          @click="onClick('supplier')"
        >
          <div class="card-body p-0">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-6">
                <div class="py-4">
                  <div class="text-center">
                    <i class="fas fa-store fa-3x mb-3"></i>
                    <h1 class="h4 text-gray-900 mb-4">Sou um Lojista</h1>
                  </div>
                  <div class="text-center">
                    <p class="px-sm-3 px-2">
                      Se você tem produtos para vender e não quer mais perder
                      dinheiro
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center option-item">
      <div class="col-sm-7">
        <div
          class="card o-hidden border-0 shadow-lg mb-5"
          @click="onClick('seller')"
        >
          <div class="card-body p-0">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-6">
                <div class="py-4">
                  <div class="text-center">
                    <i class="fas fa-user-tie fa-3x mb-3"></i>
                    <h1 class="h4 text-gray-900 mb-4">Sou um Vendedor</h1>
                  </div>
                  <div class="text-center">
                    <p class="px-sm-3 px-2">
                      Para você que quer ganhar dinheiro vendendo pela internet
                      de forma simples
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
      login: {
        status: ""
      },
      unauthorized: false
    };
  },

  mounted() {
    this.checkUnauthorized();
  },

  methods: {
    async onClick(userType) {
      this.$router.push({ name: `Login`, params: { userType } });
    },

    checkUnauthorized() {
      if (this.$route.params.unauthorized) {
        this.unauthorized = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.option-item {
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -ms-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
  opacity: 0.8;
  cursor: pointer;
  .card {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -ms-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;
  }
}

.option-item:focus,
.option-item:hover {
  opacity: 1;
  h1 {
    color: black !important;
  }
  .card {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.275) !important;
  }
}
</style>
