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
                        placeholder="CPF / CNPJ"
                        v-model="user.supplier.document"
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
                        v-model="user.email"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
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
                        class="form-control form-control-user"
                        aria-describedby="emailHelp"
                        placeholder="Senha"
                        v-model="user.password"
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
                        v-model="user.password_confirmation"
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
    async submit() {
      try {
        this.register.status = "loading";
        await register(this.user);
        this.$router.push({ name: "Supplier.Dashboard" });
        this.register.status = "success";
      } catch (err) {
        this.register.status = "error";
      }
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
