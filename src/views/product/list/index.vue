<template>
  <page title="Meus produtos">
    <div class="row">
      <div class="col-sm-3">
        <categories-list />
      </div>
      <div class="col-sm-9">
        <products-list :products="products" />
      </div>
    </div>
  </page>
</template>

<script>
import Page from "@/components/Page";
import CategoriesList from "./CategoriesList";
import ProductsList from "./ProductsList";

const products = [
  {
    img: "medias/celular.webp",
    price: 200,
    comission_type: "percentage",
    comission_value: 0.1,
    name: "Samsung Galaxy A01 Dual SIM 32 GB Preto 2 GB RAM",
    ordered: 2,
    stock: 4
  },
  {
    img: "medias/livro.webp",
    price: 369.9,
    comission_type: "percentage",
    comission_value: 0.05,
    name: "Caixa Coleção Harry Potter - 7 Volumes - Box",
    ordered: 0,
    stock: 1
  },
  {
    img: "medias/nitendo.webp",
    price: 1299.9,
    comission_type: "fixed",
    comission_value: 50.0,
    name: "Nintendo Super NES Classic Edition 512MB cinza/violeta",
    ordered: 5,
    stock: 0
  }
];

export default {
  components: { Page, CategoriesList, ProductsList },

  data() {
    return {
      products
    };
  }
};
</script>
