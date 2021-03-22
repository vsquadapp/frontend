<template>
  <div>
    <div class="row">
      <div class="form-group col-sm-6 col-lg-3">
        <label>Nome Completo</label>
        <span class="form-control">
          {{ seller.name }}
        </span>
      </div>
      <div class="form-group col-sm-6 col-lg-3">
        <label>Nome da Loja</label>
        <span class="form-control">
          {{ seller.slug }}
        </span>
      </div>
      <div class="form-group col-sm-6 col-lg-3">
        <label>CPF/CNPJ</label>
        <span class="form-control">
          {{ seller.document }}
        </span>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-6 col-lg-3">
        <label>Email</label>
        <span class="form-control">
          {{ seller.email }}
        </span>
      </div>
      <div class="form-group col-sm-6 col-lg-3">
        <label>Telefone</label>
        <span class="form-control">
          {{ seller.phone }}
        </span>
      </div>
    </div>
    <div v-if="seller.user.verified" class="row">
      <div class="form-group col-12">
        Vendedor verificado.
      </div>
    </div>
    <div class="row" v-else>
      <div class="form-group col-12">
        <div>
          Vendedor não verificado.
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
  props: ["seller"],

  methods: {
    verify() {
      const seller = this.seller;
      this.$swal({
        title: "Deseja verificar o Vendedor?",
        text: "O Vendedor só terá acesso a plataforma depois de verificado.",
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
          return AdminService.verifySeller(seller.id)
            .then(() => {
              seller.user.verified = true;
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
            title: `Vendedor Verificado!`,
            text: "Agora o Vendedor poderá ter acesso ao nosso painel."
          });
        }
      });
    }
  }
};
</script>
