<template>
  <page title="Configurações de perfil">
    <form @submit.prevent="submit">
      <div class="card mb-4 w-100">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label class="title" for="fullname">
                  Seu nome
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="fullname"
                  placeholder="Nome completo"
                  required
                  v-model="form.user.name"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label class="title" for="email">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Email"
                  required
                  v-model="form.user.email"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label class="title" for="store">
                  Nome da loja
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="store"
                  placeholder="Nome da loja"
                  required
                  v-model="form.user.store_name"
                />
              </div>
            </div>
          </div>
          <fieldset :disabled="searchingCep">
            <div class="row col-12 mt-3">
              <h6>Endereço de retirada</h6>
            </div>
            <div class="row">
              <div class="form-group col-sm-6">
                <label for="cep" class="label-control">
                  CEP
                </label>
                <input
                  id="cep"
                  type="text"
                  class="form-control"
                  @blur="searchCep"
                  v-model="form.address.zipcode"
                  v-maska="'#####-###'"
                />
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-6">
                <label for="street" class="label-control">
                  Endereço
                </label>
                <input
                  id="street"
                  type="text"
                  class="form-control"
                  v-model="form.address.street"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-6">
                <label for="complement" class="label-control">
                  Complemento
                </label>
                <input
                  id="complement"
                  type="text"
                  class="form-control"
                  v-model="form.address.complement"
                />
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-6">
                <label for="number" class="label-control">
                  Número
                </label>
                <input
                  id="number"
                  type="text"
                  class="form-control"
                  v-model="form.address.number"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-6">
                <label for="district" class="label-control">
                  Bairro
                </label>
                <input
                  id="district"
                  type="text"
                  class="form-control"
                  v-model="form.address.district"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-6">
                <label for="city" class="label-control">
                  Cidade
                </label>
                <input
                  id="city"
                  type="text"
                  class="form-control"
                  v-model="form.address.city"
                  required
                />
              </div>
            </div>
          </fieldset>
          <div class="row">
            <div class="col-sm-6 text-right">
              <button
                :disabled="submitting"
                class="btn btn-primary"
                type="submit"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </page>
</template>

<script>
import Page from "@/components/Page";
import * as cep from "cep-promise";
import { mapGetters, mapMutations } from "vuex";
import SupplierService from "@/services/suppliers";

export default {
  components: { Page },

  data() {
    return {
      searchingCep: false,
      submitting: false,
      form: {
        user: {
          name: "",
          email: "",
          store_name: ""
        },
        address: {
          zipcode: "",
          street: "",
          complement: "",
          number: "",
          district: "",
          city: "",
          state: "BA",
          country: "Brasil"
        }
      }
    };
  },

  mounted() {
    this.loadSupplier();
  },

  computed: {
    ...mapGetters(["supplier", "address"])
  },

  methods: {
    ...mapMutations(["setUser"]),

    async submit() {
      this.submitting = true;

      this.$swal({
        title: `Deseja continuar?`,
        text: `Os seus dados serão atualizados.`,
        inputAttributes: { autocapitalize: "off" },
        icon: "warning",
        reverseButtons: true,
        confirmButtonText: "Continuar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return SupplierService.update(this.supplier.id, this.form)
            .then(response => {
              this.setUser(response.data);
              return true;
            })
            .catch(() => {
              this.$swal.showValidationMessage(
                `Não foi possível realizar as alterações`
              );
              this.submitting = false;
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then(async response => {
        if (response.isConfirmed) {
          await this.$swal.fire({
            icon: "success",
            title: `Informações salvas com sucesso!`
          });
        }
        this.submitting = false;
      });
    },

    async searchCep() {
      this.searchingCep = true;
      try {
        const response = await cep(this.form.address.zipcode);
        this.form.address.city = response.city;
        this.form.address.street = response.street;
        this.form.address.district = response.neighborhood;
      } catch (err) {
        console.error("cep inválido");
      }
      this.searchingCep = false;
    },

    loadSupplier() {
      this.form.user.name = this.supplier.name;
      this.form.user.email = this.supplier.email;
      this.form.user.store_name = this.supplier.store_name;
      this.form.address = { ...this.address };
    }
  }
};
</script>
