<template>
  <page title="Cadastrar produto">
    <div class="row">
      <div class="col-sm-8">
        <div class="row">
          <div class="col-12">
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
                    required
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
                    required
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
                    required
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
                <attributesManager @change="onChangeAttributes" />
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
                    v-model="product.quantity"
                    required
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
                    Opções de entrega
                  </label>

                  <div class="row">
                    <div class="col-sm-12">
                      <select
                        id="delivery_type"
                        class="form-control"
                        v-model="product.delivery_type"
                        required
                      >
                        <option value="pickup">
                          Apenas retirada pessoalmente
                        </option>
                        <option value="delivery">
                          Apenas entrega
                        </option>
                        <option value="all">
                          Entrega e retirada pessoalmente
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  v-if="product.delivery_type !== 'pickup'"
                  class="form-group"
                >
                  <label for="">Valor da entrega</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        R$
                      </span>
                    </div>

                    <input
                      v-model="product.delivery_price"
                      class="form-control"
                      v-money="vmoney"
                      type="text"
                      required
                    />
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
                          <span class="input-group-text">
                            R$
                          </span>
                        </div>

                        <input
                          id="productPrice"
                          type="text"
                          class="form-control"
                          v-money="vmoney"
                          v-model="product.price"
                          required
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
                          required
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
                    Selecione o tipo de anúncio
                  </label>

                  <div class="row">
                    <div
                      v-for="(plan, index) of plans"
                      :key="index"
                      class="col-sm-6"
                    >
                      <plan-type-item
                        class="plan-item"
                        :selected="product.plan == plan"
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

      <div class="col-sm-4">
        <div class="row">
          <div class="col-12">
            <div class="card mb-4 w-100 bg-gray-100">
              <div class="card-body">
                <div class="form-group">
                  <h5 class="text-gray-900 mb-4">Resumo de custos</h5>

                  <div>
                    <span>Preço do seu produto</span>
                    <span style="float: right">
                      R$ {{ product.price || 0 }}
                    </span>
                  </div>
                  <hr />

                  <div>
                    <span>Valor da comissão</span>
                    <span style="float: right">
                      {{ formatMoney(comissionValue) }}
                    </span>
                  </div>
                  <hr />

                  <div>
                    <span>Tarifa</span>
                    <span style="float: right">
                      {{ formatMoney(taxValue) }}
                    </span>
                  </div>
                  <hr />
                  <br />

                  <div>
                    <strong class="text-gray-900 text-bold">
                      Você receberá por cada venda
                    </strong>
                    <strong class="text-gray-900" style="float: right">
                      {{ formatMoney(receiveValue) }}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-12 col-sm-8 text-right">
        <button
          class="btn btn-primary d-inline-flex align-items-center save-action"
          @click="submit"
          :disabled="loading"
        >
          Cadastrar produto
          <div
            v-if="loading"
            class="spinner-border spinner-border-sm text-light ml-3"
            role="status"
          ></div>
        </button>
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import ImagePicker from "@/components/ImagePicker";
import PlanTypeItem from "@/components/PlanTypeItem";
import AttributesManager from "@/components/products/AttributesManager";
import { mask } from "vue-the-mask";
import { VMoney } from "v-money";
import unmask from "@/utils/unmask";
import formatMoney from "@/utils/formatMoney";
import ProductService from "@/services/products";

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
    items: [{ icon: "fas fa-low-vision", text: "Exposição máxima" }],
    tax: 0.05
  }
  // {
  //   id: 1,
  //   title: "Premium",
  //   items: [{ icon: "far fa-eye text-success", text: "Exposição máxima" }],
  //   tax: 0.05
  // }
];

export default {
  directives: { mask, money: VMoney },

  components: { Page, ImagePicker, PlanTypeItem, AttributesManager },

  data() {
    return {
      loading: false,
      product: {
        name: "",
        quantity: "",
        description: "",
        price: "",
        comission_type: "percentage",
        comission_value: 0,
        category: "",
        delivery_type: "all",
        delivery_price: 0,
        images: [],
        plan: plans[0],
        attribute: null
      },
      plans,
      vmoney
    };
  },

  computed: {
    price() {
      return unmask(this.product.price);
    },

    comissionValue() {
      if (!this.price) return 0;
      if (!this.product.comission_value) return 0;
      if (this.product.comission_type === "percentage") {
        return (this.price * this.product.comission_value) / 100 / 100;
      }
      return unmask(this.product.comission_value) / 100;
    },

    taxValue() {
      if (!this.price) return 0;
      return (this.price * this.product.plan.tax) / 100;
    },

    receiveValue() {
      return this.price / 100 - this.taxValue - this.comissionValue;
    },

    productPayload() {
      const comission_price = unmask(this.product.comission_value);
      const delivery_price = unmask(this.product.delivery_price);
      const comission_value =
        this.product.comission_type === "percentage"
          ? comission_price * 100
          : comission_price;
      return {
        ...this.product,
        price: this.price,
        delivery_price: delivery_price,
        comission_value
      };
    }
  },

  methods: {
    async submit() {
      this.loading = true;
      try {
        await ProductService.create(this.productPayload);
        await this.$swal({
          title: "Produto cadastrado!",
          text: "O produto já está na sua loja disponível para venda!",
          icon: "success"
        });
        this.$router.push({ name: "Supplier.ListProduct" });
      } catch (err) {
        await this.$swal({
          title: "Ocorreu um erro ao cadastrar o produto!",
          text: err.response.data.error,
          icon: "error"
        });
      }
      this.loading = false;
    },

    onSelectPlan(plan) {
      this.product.plan = plan;
    },

    onChangeImages(images) {
      this.product.images = images;
    },

    onChangeComissionType() {
      this.product.comission_value = 0;
    },

    formatMoney(value) {
      return formatMoney(value);
    },

    onChangeAttributes(attribute) {
      this.product.attribute = JSON.stringify(attribute);
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

@media only screen and (max-width: 575px) {
  .save-action {
    width: 100%;
    justify-content: center;
  }
}
</style>
