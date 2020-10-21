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
                      />
                    </div>
                    <div class="form-group">
                      <input
                        id="document"
                        name="document"
                        type="text"
                        required
                        class="form-control form-control-user"
                        placeholder="CPF / CNPJ"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        class="form-control form-control-user"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        class="form-control form-control-user"
                        placeholder="Telefone / Whatsapp"
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
                      />
                    </div>
                    <div class="form-group">
                      <input
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        required
                        class="form-control form-control-user"
                        placeholder="Confirmação de senha"
                      />
                    </div>

                    <label class="label-control mb-0 mt-3">
                      Endereço
                    </label>
                    <hr />

                    <div class="form-group">
                      <input
                        @blur="getCEP"
                        v-model="form.cep"
                        type="text"
                        required
                        autocomplete
                        class="form-control form-control-user"
                        placeholder="CEP"
                      />
                    </div>

                    <fieldset :disabled="cepRequest.status === 'loading'">
                      <div class="form-group">
                        <input
                          v-model="form.city"
                          type="text"
                          required
                          autocomplete
                          class="form-control form-control-user"
                          placeholder="Cidade"
                        />
                      </div>

                      <div class="form-group">
                        <input
                          v-model="form.neighborhood"
                          type="text"
                          required
                          autocomplete
                          class="form-control form-control-user"
                          placeholder="Bairro"
                        />
                      </div>

                      <div class="form-group">
                        <input
                          v-model="form.street"
                          type="text"
                          required
                          autocomplete
                          class="form-control form-control-user"
                          placeholder="Rua"
                        />
                      </div>
                    </fieldset>

                    <div class="form-group">
                      <input
                        v-model="form.number"
                        type="text"
                        required
                        autocomplete
                        class="form-control form-control-user"
                        placeholder="Número"
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
                        v-if="register.status === 'loading'"
                        class="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    </button>
                  </form>
                  <br />
                  <div class="text-center mt-2">
                    <router-link :to="{ name: 'Login' }">
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
import { register } from "@/services/auth";
import * as cep from "cep-promise";

export default {
  data() {
    return {
      register: {
        status: ""
      },
      cepRequest: {
        status: ""
      },
      form: {
        cep: "",
        city: "",
        street: "",
        neighborhood: "",
        number: ""
      }
    };
  },

  methods: {
    async submit() {
      try {
        this.register.status = "loading";
        await register();
        this.$router.push({ name: "Dashboard" });
        this.register.status = "success";
      } catch (err) {
        this.register.status = "error";
      }
    },

    async getCEP() {
      this.cepRequest.status = "loading";
      try {
        const response = await cep(this.form.cep);
        this.form.city = response.city;
        this.form.street = response.street;
        this.form.neighborhood = response.neighborhood;
        this.cepRequest.status = "success";
      } catch (err) {
        this.cepRequest.status = "error";
      }
    }
  }
};
</script>
