<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-12 col-xl-8">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-6">
                <div class="px-4 px-lg-0 py-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">
                      Cadastro de vendedor
                    </h1>
                  </div>
                  <form class="user" @submit.prevent="submit">
                    <label class="label-control mb-0 mt-3">
                      Preencha os seus dados
                    </label>
                    <hr />
                    <div class="form-group">
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        autocomplete
                        required
                        class="form-control form-control-user"
                        aria-describedby="emailHelp"
                        placeholder="Nome Completo"
                        v-model="user.name"
                      />
                    </div>

                    <div class="form-group">
                      <select
                        class="form-control"
                        name="gender"
                        id="gender"
                        v-model="user.seller.gender"
                        required
                      >
                        <option value="" disabled selected>
                          Selecione o sexo
                        </option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="O">Outro</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <input
                        id="document"
                        name="document"
                        type="text"
                        required
                        class="form-control form-control-user"
                        placeholder="CPF / CNPJ"
                        v-model="user.seller.document"
                      />
                    </div>

                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text form-control-user py-2">
                          Data de nascimento
                        </span>
                      </div>
                      <input
                        id="birthdate"
                        type="date"
                        class="form-control form-control-user"
                        v-model="user.seller.birthdate"
                        required
                      />
                    </div>

                    <div class="form-group">
                      <input
                        id="slug"
                        name="slug"
                        type="slug"
                        required
                        class="form-control form-control-user"
                        :class="{ 'is-invalid': errors.slug }"
                        placeholder="Nome da sua loja"
                        v-model="user.seller.slug"
                      />
                      <div class="invalid-feedback">
                        {{ errors.slug }}
                      </div>
                      <div class="text-secondary">
                        <small>
                          Escolha um nome para usa loja dentro do VSquad.
                        </small>
                      </div>
                    </div>

                    <div class="form-group">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        class="form-control form-control-user"
                        :class="{ 'is-invalid': errors.email }"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        v-model="user.email"
                      />
                      <div class="invalid-feedback">
                        {{ errors.email }}
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        class="form-control form-control-user"
                        placeholder="Telefone / Whatsapp"
                        v-model="user.seller.phone"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        class="form-control form-control-user"
                        aria-describedby="emailHelp"
                        placeholder="Senha"
                        v-model="user.password"
                        @input="validatePassword"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        ref="passwordConfirm"
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        required
                        class="form-control form-control-user"
                        placeholder="Confirmação de senha"
                        v-model="user.password_confirmation"
                        @input="validatePassword"
                      />
                    </div>

                    <button
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                    >
                      <span class="pr-2">
                        Registrar
                      </span>
                      <div
                        v-if="form.status === 'loading'"
                        class="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </button>
                  </form>
                  <br />
                  <div class="text-center mt-2">
                    <router-link
                      :to="{ name: 'Login', params: { userType: 'seller' } }"
                    >
                      Já tem uma conta? <b>Entre agora mesmo</b>
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        status: ""
      },
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        seller: {
          gender: "",
          document: "",
          phone: "",
          birthdate: "",
          slug: ""
        },
        user_type: "seller"
      },
      errors: {
        email: false,
        slug: false
      }
    };
  },

  methods: {
    ...mapActions(["register"]),

    async submit() {
      this.resetErrors();
      try {
        this.form.status = "loading";
        await this.register(this.user);
        this.$router.push({ name: "Seller.Dashboard" });
        this.form.status = "success";
      } catch (err) {
        const data = JSON.parse(err.response.data);
        this.handleErrors(data);
        this.form.status = "error";
      }
    },

    handleErrors(data) {
      if (data?.email) {
        const errors = data.email;
        if (errors.includes("The email has already been taken.")) {
          this.errors.email = "Email já cadastrado no sistema";
        } else {
          this.errors.email = "Corrija o seu email";
        }
      }

      if (data?.["seller.slug"]) {
        const errors = data["seller.slug"];
        if (errors.includes("The seller.slug has already been taken.")) {
          this.errors.slug = "Nome da loja já cadastrado no sistema!";
        }
      }
    },

    validatePassword() {
      const confirmElement = this.$refs.passwordConfirm;

      if (this.user.password != this.user.password_confirmation) {
        confirmElement.setCustomValidity("As senhas não coicidem");
      } else {
        confirmElement.setCustomValidity("");
      }
    },

    resetErrors() {
      this.errors.email = false;
      this.errors.slug = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#gender {
  border-radius: 10rem;
  height: 50px;
  font-size: 0.8rem;
}
</style>
