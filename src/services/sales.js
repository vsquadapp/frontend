const sales = [
  {
    id: 1,
    product: {
      id: 3,
      img: "medias/nitendo.webp",
      price: 1299.9,
      comission_type: "fixed",
      deliveryType: "1",
      comission_value: 50.0,
      description: "Estado de novo",
      name: "Nintendo Super NES Classic Edition 512MB cinza/violeta",
      saleed: 5,
      category: "Games",
      stock: 0
    },
    quantity: 2,
    created_at: "2020-10-20",
    price: 2400
  },
  {
    id: 2,
    product: {
      id: 1,
      img: "medias/celular.webp",
      price: 200,
      comission_type: "percentage",
      deliveryType: "1",
      comission_value: 0.1,
      name: "Samsung Galaxy A01 Dual SIM 32 GB Preto 2 GB RAM",
      description: "celular de ultima geração",
      plan: {
        id: 0,
        title: "Clássico",
        items: [{ icon: "fas fa-low-vision", text: "Exposição baixa" }],
        tax: 0.02
      }
    },
    quantity: 1,
    created_at: "2020-10-17",
    price: 200
  },
  {
    id: 3,
    product: {
      id: 3,
      img: "medias/nitendo.webp",
      price: 1299.9,
      comission_type: "fixed",
      deliveryType: "1",
      comission_value: 50.0,
      description: "Estado de novo",
      name: "Nintendo Super NES Classic Edition 512MB cinza/violeta",
      saleed: 5,
      category: "Games",
      stock: 0
    },
    quantity: 4,
    created_at: "2020-10-02",
    price: 4800
  },
  {
    id: 4,
    product: {
      id: 2,
      img: "medias/livro.webp",
      price: 369.9,
      comission_type: "percentage",
      deliveryType: "1",
      comission_value: 0.05,
      name: "Caixa Coleção Harry Potter - 7 Volumes - Box",
      description: "Todos os livros da série",
      saleed: 0,
      category: "Livros",
      stock: 1
    },
    quantity: 1,
    created_at: "2020-09-01",
    price: 400
  },
  {
    id: 5,
    product: {
      id: 3,
      img: "medias/nitendo.webp",
      price: 1299.9,
      comission_type: "fixed",
      deliveryType: "1",
      comission_value: 50.0,
      description: "Estado de novo",
      name: "Nintendo Super NES Classic Edition 512MB cinza/violeta",
      saleed: 5,
      category: "Games",
      stock: 0
    },
    quantity: 1,
    created_at: "2020-08-30",
    price: 1200
  }
];

export function index() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sales);
    }, 2000);
  });
}
export function getById(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const sale = sales.find(p => p.id == id);
      resolve(sale);
    }, 2000);
  });
}

export default {
  index,
  getById
};
