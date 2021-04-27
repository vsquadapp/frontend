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
                      Cadastro de fornecedor
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
                      <input
                        id="document"
                        name="document"
                        type="text"
                        required
                        class="form-control form-control-user"
                        :class="{ 'is-invalid': form.errors.document }"
                        placeholder="CPF / CNPJ"
                        v-model="user.supplier.document"
                      />
                      <div class="invalid-feedback">
                        CPF/CNPJ é obrigatório
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autocomplete
                        class="form-control form-control-user"
                        :class="{ 'is-invalid': form.errors.email }"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                        v-model="user.email"
                      />
                      <div class="invalid-feedback">
                        {{ form.errors.email }}
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        required
                        class="form-control form-control-user"
                        placeholder="Telefone / Whatsapp"
                        v-model="user.supplier.phone"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autocomplete
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
                        autocomplete="false"
                        class="form-control form-control-user"
                        placeholder="Confirmação de senha"
                        v-model="user.password_confirmation"
                        @input="validatePassword"
                      />
                    </div>

                    <label class="label-control mb-0 mt-3">
                      Endereço
                    </label>
                    <hr />

                    <div class="form-group">
                      <input
                        @blur="getCEP"
                        type="text"
                        required
                        autocomplete
                        class="form-control form-control-user"
                        placeholder="CEP"
                        v-model="user.address.zipcode"
                      />
                    </div>

                    <fieldset :disabled="cepRequest.status === 'loading'">
                      <div class="form-group">
                        <input
                          type="text"
                          required
                          autocomplete
                          class="form-control form-control-user"
                          placeholder="Cidade"
                          v-model="user.address.city"
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="text"
                          required
                          autocomplete
                          class="form-control form-control-user"
                          placeholder="Bairro"
                          v-model="user.address.district"
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="text"
                          required
                          autocomplete
                          class="form-control form-control-user"
                          placeholder="Rua"
                          v-model="user.address.street"
                        />
                      </div>
                    </fieldset>

                    <div class="form-group">
                      <input
                        type="text"
                        required
                        autocomplete
                        class="form-control form-control-user"
                        placeholder="Número"
                        v-model="user.address.number"
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
                      :to="{ name: 'Login', params: { userType: 'supplier' } }"
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
import * as cep from "cep-promise";

export default {
  data() {
    return {
      form: {
        status: "",
        errors: {}
      },
      cepRequest: {
        status: ""
      },
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        supplier: {
          phone: "",
          document: ""
        },
        address: {
          zipcode: "",
          city: "",
          street: "",
          district: "",
          number: "",
          state: "BA",
          country: "Brasil"
        },
        user_type: "supplier"
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
        this.$router.push({ name: "Supplier.Dashboard" });
        this.form.status = "success";
      } catch (err) {
        const data = JSON.parse(err.response.data);
        this.handleErrors(data);
        this.form.status = "error";
      }
    },

    handleErrors(errors) {
      Object.keys(errors).forEach(key => {
        this.form.errors[key] = errors[key][0];
      });
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
      this.form.errors = {};
    },

    async getCEP() {
      this.cepRequest.status = "loading";
      try {
        const response = await cep(this.user.address.zipcode);
        this.user.address.city = response.city;
        this.user.address.street = response.street;
        this.user.address.district = response.neighborhood;
        this.cepRequest.status = "success";
      } catch (err) {
        this.cepRequest.status = "error";
      }
    }
  }
};
</script>
