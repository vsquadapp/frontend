const products = [
  {
    id: 1,
    img: "medias/celular.webp",
    price: 200,
    comission_type: "percentage",
    deliveryType: "1",
    comission_value: 0.1,
    name: "Samsung Galaxy A01 Dual SIM 32 GB Preto 2 GB RAM",
    ordered: 2,
    category: "Celulares",
    stock: 4,
    description: "celular de ultima geração",
    plan: {
      id: 0,
      title: "Clássico",
      items: [{ icon: "fas fa-low-vision", text: "Exposição baixa" }],
      tax: 0.02
    }
  },
  {
    id: 2,
    img: "medias/livro.webp",
    price: 369.9,
    comission_type: "percentage",
    deliveryType: "1",
    comission_value: 0.05,
    name: "Caixa Coleção Harry Potter - 7 Volumes - Box",
    description: "Todos os livros da série",
    ordered: 0,
    category: "Livros",
    stock: 1
  },
  {
    id: 3,
    img: "medias/nitendo.webp",
    price: 1299.9,
    comission_type: "fixed",
    deliveryType: "1",
    comission_value: 50.0,
    description: "Estado de novo",
    name: "Nintendo Super NES Classic Edition 512MB cinza/violeta",
    ordered: 5,
    category: "Games",
    stock: 0
  }
];

export function index() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(products);
    }, 2000);
  });
}
export function getById(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const product = products.find(p => p.id == id);
      resolve(product);
    }, 2000);
  });
}

export default {
  index,
  getById
};
