<template>
  <div>
    <div class="row">
      <div class="form-group col-sm-6 col-lg-3">
        <label>Nome Completo</label>
        <span class="form-control">
          {{ supplier.name }}
        </span>
      </div>
      <div class="form-group col-sm-6 col-lg-3">
        <label>Nome da Loja</label>
        <span class="form-control">
          {{ supplier.store_name }}
        </span>
      </div>
      <div class="form-group col-sm-6 col-lg-3">
        <label>CPF/CNPJ</label>
        <span class="form-control">
          {{ supplier.document }}
        </span>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-6 col-lg-3">
        <label>Email</label>
        <span class="form-control">
          {{ supplier.email }}
        </span>
      </div>
      <div class="form-group col-sm-6 col-lg-3">
        <label>Telefone</label>
        <span class="form-control">
          {{ supplier.phone }}
        </span>
      </div>
    </div>
    <div v-if="supplier.user.verified" class="row">
      <div class="form-group col-12">
        Fornecedor verificado.
      </div>
    </div>
    <div class="row" v-else>
      <div class="form-group col-12">
        <div>
          Fornecedor não verificado.
        </div>
        <div>
          <button @click="verify" class="btn btn-primary">
            Verificar agora
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/admin";

export default {
  props: ["supplier"],

  methods: {
    verify() {
      const supplier = this.supplier;
      this.$swal({
        title: "Deseja verificar o Fornecedor?",
        text: "O fornecedor só terá acesso a plataforma depois de verificado.",
        inputAttributes: {
          autocapitalize: "off"
        },
        icon: "warning",
        reverseButtons: true,
        confirmButtonText: "Sim",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return AdminService.verifySupplier(supplier.id)
            .then(() => {
              supplier.user.verified = true;
              return true;
            })
            .catch(error => {
              this.$swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
        allowOutsideClick: () => !this.$swal.isLoading()
      }).then(response => {
        if (response.isConfirmed) {
          this.$swal.fire({
            icon: "success",
            title: `Fornecedor Verificado!`,
            text: "Agora o Fornecedor poderá ter acesso ao nosso painel."
          });
        }
      });
    }
  }
};
</script>
