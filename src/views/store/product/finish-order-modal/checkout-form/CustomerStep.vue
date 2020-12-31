<template>
  <form @submit.prevent="onSubmit" class="customer-step">
    <div class="modal-body">
      <h6>Informações para contato</h6>
      <div class="form-group">
        <label for="fullname" class="label-control text-gray-900">
          Nome completo
        </label>
        <input
          id="fullname"
          type="text"
          class="form-control"
          placeholder="Seu nome completo"
          required
          v-model="customer.name"
        />
      </div>
      <div class="form-group">
        <label for="email" class="label-control text-gray-900">
          Email
        </label>
        <input
          id="email"
          type="text"
          class="form-control"
          placeholder="Seu email"
          required
          v-model="customer.email"
        />
      </div>
      <div class="form-group">
        <label for="phone" class="label-control text-gray-900">
          Telefone (opcional)
        </label>
        <input
          id="phone"
          placeholder="Telefone"
          type="text"
          class="form-control"
          v-model="customer.phone"
        />
      </div>
    </div>
    <div class="modal-footer">
      <slot></slot>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    form: Object
  },

  data() {
    return {
      customer: {
        name: "",
        email: "",
        phone: ""
      }
    };
  },

  mounted() {
    this.fillForm(this.form.customer);
  },

  methods: {
    fillForm(customer) {
      this.customer.name = customer.name;
      this.customer.email = customer.email;
      this.customer.phone = customer.phone;
    },

    onSubmit() {
      this.$emit("next");
    }
  },

  watch: {
    customer: {
      deep: true,
      handler() {
        const form = {
          ...this.form,
          customer: this.customer
        };
        this.$emit("update:form", form);
      }
    }
  }
};
</script>
