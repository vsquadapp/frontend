<template>
  <page title="Cadastrar produto">
    <div class="row">
      <div class="col-12 col-sm-8">
        <div class="card mb-4 w-100">
          <div class="card-body">
            <div class="form-group">
              <label class="title" for="productName">
                Indique seu produto, marca e modelo
              </label>
              <input
                type="text"
                class="form-control"
                id="productName"
                placeholder="Ex.: Celular Samsung Galaxy S9 64 GB preto"
                v-model="product.name"
              />
              <small class="form-text text-muted">
                Este será o título do item. É através desse nome que os
                vendedores irão localizar o seu produto.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-8">
        <div class="card mb-4 w-100">
          <div class="card-body">
            <div class="form-group">
              <label class="title" for="productCategory">
                Descrição
              </label>

              <textarea
                class="form-control"
                id="productCategory"
                rows="4"
                placeholder="Ex.: Com seu processador potente e sua memória RAM de 6 GB você poderá maximizar seu desempenho, com excelente velocidade de transmissão de conteúdo. Execute vários aplicativos ao mesmo tempo sem atrasos!"
                v-model="product.description"
              />

              <small class="form-text text-muted">
                Descreva brevemente seu produto para ajudar os clientes finais
                decidirem sobre a compra.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-8">
        <div class="card mb-4 w-100">
          <div class="card-body">
            <div class="form-group">
              <label class="title" for="productCategory">
                Categoria
              </label>

              <input
                type="text"
                class="form-control"
                id="productCategory"
                placeholder="Ex.: Smartphones"
                v-model="product.category"
              />

              <small class="form-text text-muted">
                Os vendedores encontrarão seu produto mais facilmente se você
                categoriza-lo corretamente.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-8">
        <div class="card mb-4 w-100">
          <div class="card-body">
            <div class="form-group">
              <div>
                <label class="title mb-0">
                  Características Gerais
                </label>
              </div>
              <small class="mt-0">
                Informações mais específicas sobre o produto, como por exemplo,
                tamanho, voltagem, garantia, etc.
              </small>
            </div>

            <div class="row">
              <div class="col-sm-3" v-for="(info, index) of infos" :key="index">
                <h5 class="mb-0 text-gray-900">{{ info.key }}</h5>
                <p class="">{{ info.value }}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <form class="form-inline" @submit.prevent="addInfo">
                  <div class="form-group mb-2">
                    <input
                      type="text"
                      required
                      class="form-control"
                      placeholder="Característica"
                      v-model="info.key"
                    />
                  </div>
                  <div class="form-group mx-sm-3 mb-2 mr-2">
                    <input
                      type="text"
                      required
                      class="form-control"
                      placeholder="Descrição"
                      v-model="info.value"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary mb-2">
                    <i class="fas fa-plus"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-8">
        <div class="card mb-4 w-100">
          <div class="card-body">
            <div class="form-group">
              <label class="title" for="productQuantity">
                Quantidade no estoque
              </label>

              <input
                type="number"
                min="1"
                class="form-control"
                id="productQuantity"
                v-model="product.quantity"
              />

              <small class="form-text text-muted">
                Informe a quantidade de itens disponíveis para garantir a
                entrega do produto.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-8">
        <div class="card mb-4 w-100">
          <div class="card-body">
            <div class="form-group">
              <div>
                <label class="title mb-0">
                  Imagens e videos
                </label>
              </div>
              <small>
                Adicione fotos ou videos para facilidar a identificação do seu
                produto.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-8">
        <div class="card mb-4 w-100">
          <div class="card-body">
            <div class="form-group">
              <label class="title mb-3">
                Informações de venda
              </label>

              <div class="row">
                <div class="col-sm-6">
                  <label for="productPrice">Preço de venda</label>
                  <input id="productPrice" type="text" class="form-control" />
                  <small>
                    Preço de venda do produto.
                  </small>
                </div>

                <div class="col-sm-6 mt-3 mt-sm-0">
                  <label for="productComission">Valor da comissão</label>
                  <input
                    id="productComission"
                    type="text"
                    class="form-control"
                  />
                  <small>
                    Valor da comissão passada para o vendedor.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-8 text-right">
        <button class="btn btn-primary ">Cadastrar produto</button>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";

export default {
  components: { Page },

  data() {
    return {
      product: {
        name: "",
        category: "",
        quantity: "",
        description: ""
      },
      infos: [],
      info: {
        key: "",
        value: ""
      }
    };
  },

  methods: {
    addInfo() {
      if (!this.info.key || !this.info.value) return false;
      this.infos.push({ ...this.info });
      this.info = { key: "", value: "" };
    }
  }
};
</script>

<style lang="scss" scoped>
label.title {
  color: black;
  font-size: 20px;
}

input::placeholder {
  opacity: 0.5;
}
</style>
