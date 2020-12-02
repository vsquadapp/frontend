<template>
  <div
    class="modal fade"
    id="logoutModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body text-center pt-5">
          <h4 class="modal-title" id="exampleModalLabel">
            Deseja realmente sair?
          </h4>
        </div>
        <div class="modal-footer border-0 justify-content-center">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">
            Cancelar
          </button>
          <button
            class="btn btn-primary"
            type="button"
            data-dismiss="modal"
            @click="onLogout"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"])
  },

  methods: {
    ...mapActions(["logout"]),

    async onLogout() {
      const userType = this.user.user_type;
      await this.logout();
      this.$router.push({ name: "Login", params: { userType } });
    }
  }
};
</script>
