<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-xl-8 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-6">
                <div class="px-3 px-lg-0 py-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Login</h1>
                  </div>
                  <form class="user" @submit.prevent="submit">
                    <div class="form-group">
                      <input
                        type="email"
                        required
                        class="form-control form-control-user"
                        aria-describedby="emailHelp"
                        placeholder="Digite o seu e-mail"
                        v-model="credentials.email"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        required
                        autocomplete
                        class="form-control form-control-user"
                        placeholder="Senha"
                        v-model="credentials.password"
                      />
                    </div>

                    <button
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                    >
                      <span class="pr-2">
                        Entrar
                      </span>
                      <div
                        v-if="login.status === 'loading'"
                        class="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </button>
                  </form>
                  <br />
                  <div v-if="login.message">
                    <div
                      class="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>Oops!</strong> {{ login.message }}.
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
                  <div class="text-center">
                    <router-link :to="{ name: 'RecoveryPassword' }">
                      Esqueceu a senha?
                    </router-link>
                  </div>
                  <div class="text-center mt-2">
                    <router-link :to="registerLink">
                      Ainda não tem uma conta? <b>Registre-se</b>
                    </router-link>
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
// import { signin } from "@/services/auth";
import { mapActions } from "vuex";

export default {
  props: {
    userType: String
  },

  data() {
    return {
      login: {
        status: "",
        message: ""
      },
      credentials: {
        email: "",
        password: ""
      }
    };
  },

  computed: {
    registerLink() {
      return this.isSupplier
        ? { name: "Supplier.Register" }
        : { name: "Seller.Register" };
    },

    dashboardLink() {
      return this.isSupplier
        ? { name: "Supplier.Dashboard" }
        : { name: "Seller.Dashboard" };
    },

    isSupplier() {
      return this.userType === "supplier";
    }
  },

  methods: {
    ...mapActions(["signin"]),

    async submit() {
      try {
        this.login.message = "";
        this.login.status = "loading";
        await this.signin(this.credentials);
        this.$router.push(this.dashboardLink);
        this.login.status = "success";
      } catch (err) {
        if (err?.response?.data?.error == "Unauthorized") {
          this.login.message = "Usuário ou senha inválidos";
        }
        this.login.status = "error";
      }
    }
  }
};
</script>
