<template>
  <page title="Editar produto">
    <div v-if="product">
      <div class="row">
        <div class="col-sm-12">
          <div class="row">
            <div class="col-12">
              <div class="card mb-4 w-100">
                <div class="card-body">
                  <div class="form-group">
                    <label class="title" for="productName">
                      Título do seu produto
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
            <div class="col-12">
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
                      Descreva brevemente seu produto para ajudar os clientes
                      finais decidirem sobre a compra.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
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
                      Os vendedores encontrarão seu produto mais facilmente se
                      você categoriza-lo corretamente.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card mb-4 w-100">
                <div class="card-body">
                  <div class="form-group">
                    <div>
                      <label class="title mb-0">
                        Características Gerais
                      </label>
                    </div>
                    <small class="mt-0">
                      Informações mais específicas sobre o produto, como por
                      exemplo, tamanho, voltagem, garantia, etc.
                    </small>
                  </div>

                  <div class="row">
                    <div
                      class="col-sm-3"
                      v-for="(info, index) of infos"
                      :key="index"
                    >
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
            <div class="col-12 col-sm-6 d-flex align-items-stretch">
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
                      v-model="product.stock"
                    />

                    <small class="form-text text-muted">
                      Informe a quantidade de itens disponíveis para garantir a
                      entrega do produto.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 d-flex align-items-stretch">
              <div class="card mb-4 w-100">
                <div class="card-body">
                  <div class="form-group">
                    <label class="title ">
                      Você quer oferecer retirada pessoalmente?
                    </label>

                    <div class="row">
                      <div class="col-sm-12">
                        <select
                          id="deliveryType"
                          class="form-control"
                          v-model="product.deliveryType"
                        >
                          <option value="1">
                            Sim, oferecer retirada pessoalmente.
                          </option>
                          <option value="2">
                            Não, só faço envios.
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card mb-4 w-100">
                <div class="card-body">
                  <div class="form-group">
                    <div>
                      <label class="title mb-0">
                        Imagens e videos
                      </label>
                    </div>
                    <small>
                      Adicione fotos ou videos para facilidar a identificação do
                      seu produto.
                    </small>
                  </div>
                  <div>
                    <image-picker @change="onChangeImages" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card mb-4 w-100">
                <div class="card-body">
                  <div class="form-group">
                    <label class="title mb-3">
                      Informações de venda
                    </label>

                    <div class="row">
                      <div class="col-sm-6">
                        <label for="productPrice">Preço de venda</label>

                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">
                              R$
                            </span>
                          </div>

                          <input
                            id="productPrice"
                            type="text"
                            class="form-control"
                            v-money="vmoney"
                            v-model="product.textprice"
                          />
                        </div>
                        <small>
                          Preço de venda do produto.
                        </small>
                      </div>

                      <div class="col-sm-6 mt-3 mt-sm-0">
                        <label for="productComission">Comissão</label>
                        <div class="input-group">
                          <select
                            class="custom-select"
                            id="productComission"
                            v-model="product.comission_type"
                            @change="onChangeComissionType"
                          >
                            <option disabled>Tipo de comissão</option>
                            <option value="percentage">Percentual</option>
                            <option value="fixed">Valor fixo</option>
                          </select>
                          <div
                            v-if="product.comission_type === 'fixed'"
                            class="input-group-prepend"
                          >
                            <span class="input-group-text">R$</span>
                          </div>
                          <input
                            v-if="product.comission_type === 'fixed'"
                            id="ProductComissionPrice"
                            type="text"
                            class="form-control"
                            placeholder="Valor"
                            v-money="vmoney"
                            v-model="product.comission_value"
                          />
                          <input
                            v-if="product.comission_type === 'percentage'"
                            id="ProductComissionPercentage"
                            type="text"
                            class="form-control text-right"
                            placeholder="Valor"
                            v-mask="'##'"
                            v-model="product.comission_value"
                          />
                          <div
                            v-if="product.comission_type === 'percentage'"
                            class="input-group-append"
                          >
                            <span class="input-group-text">%</span>
                          </div>
                        </div>
                        <small>
                          Valor passado para o vendedor no momento da venda.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card mb-4 w-100">
                <div class="card-body">
                  <div class="form-group">
                    <label class="title mb-3">
                      Tipo de anúncio
                    </label>

                    <div class="row">
                      <div
                        v-for="(plan, index) of plans"
                        :key="index"
                        class="col-sm-6"
                      >
                        <plan-type-item
                          class="plan-item"
                          :selected="product.plan.id == plan.id"
                          :plan="plan"
                          :price="price"
                          @click="onSelectPlan(plan)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-5">
        <div class="col-12  text-right">
          <button class="btn btn-primary" @click="submit">
            Salvar
          </button>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import ImagePicker from "@/components/ImagePicker";
import PlanTypeItem from "@/components/PlanTypeItem";
import { mask } from "vue-the-mask";
import { VMoney } from "v-money";
import unmask from "@/utils/unmask";
import formatMoney from "@/utils/formatMoney";
import ProductsService from "@/services/products";

const vmoney = {
  decimal: ",",
  thousands: ".",
  prefix: "",
  precision: 2
};

const plans = [
  {
    id: 0,
    title: "Clássico",
    items: [{ icon: "fas fa-low-vision", text: "Exposição baixa" }],
    tax: 0.02
  },
  {
    id: 1,
    title: "Premium",
    items: [{ icon: "far fa-eye text-success", text: "Exposição máxima" }],
    tax: 0.05
  }
];

export default {
  props: { id: String },

  directives: { mask, money: VMoney },

  components: { Page, ImagePicker, PlanTypeItem },

  data() {
    return {
      product: null,
      infos: [],
      info: {
        key: "",
        value: ""
      },
      plans,
      vmoney
    };
  },

  mounted() {
    this.loadProduct();
  },

  computed: {
    price() {
      return unmask(this.product.textprice);
    },

    comissionValue() {
      if (!this.price) return 0;
      if (!this.product.comission_value) return 0;
      if (this.product.comission_type === "percentage") {
        return (this.price * this.product.comission_value) / 10000;
      }
      return unmask(this.product.comission_value) / 100;
    },

    taxValue() {
      if (!this.price) return 0;
      return (this.price * this.product.plan.tax) / 100;
    },

    receiveValue() {
      return this.price / 100 - this.taxValue - this.comissionValue;
    }
  },

  methods: {
    async loadProduct() {
      const product = await ProductsService.getById(this.id);
      product.textprice = formatMoney(product.price);
      this.product = product;
    },

    async submit() {
      await this.$swal({
        title: "Produto salvo!",
        text: "O produto foi atualizado com sucesso!",
        icon: "success"
      });
      this.$router.push({ name: "Supplier.ListProduct" });
    },

    addInfo() {
      if (!this.info.key || !this.info.value) return false;
      this.infos.push({ ...this.info });
      this.info = { key: "", value: "" };
    },

    onSelectPlan(plan) {
      this.product.plan = plan;
    },

    onChangeImages(images) {
      this.product.images = images;
    },

    onChangeComissionType() {
      this.product.comission_value = "";
    },

    formatMoney(value) {
      return formatMoney(value);
    }
  }
};
</script>

<style lang="scss" scoped>
label.title {
  color: black;
  font-size: 20px;
}

textarea::placeholder,
input::placeholder {
  opacity: 0.5;
}

.plan-item {
  cursor: pointer;
}
</style>
