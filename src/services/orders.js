const axios = require("axios");
const baseUrl = process.env.VUE_APP_BASE_URL;
3;
const orders = [
  {
    id: 1,
    product: {
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
    quantity: 1,
    created_at: "2020-10-05",
    received: 180,
    comission: 20,
    price: 200
  },
  {
    id: 2,
    product: {
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
    },
    quantity: 1,
    created_at: "2020-10-02",
    received: 1100,
    comission: 100,
    price: 1200
  },
  {
    id: 3,
    product: {
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
    quantity: 1,
    created_at: "2020-10-01",
    received: 350,
    comission: 50,
    price: 400
  }
];

export function index() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(orders);
    }, 2000);
  });
}

export function getById(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const order = orders.find(p => p.id == id);
      resolve(order);
    }, 2000);
  });
}

export function create(data) {
  return axios.post(`${baseUrl}/api/orders`, data);
}

export function complete(id) {
  return axios.post(`${baseUrl}/api/orders/${id}/complete`);
}

export function showByCode(code) {
  return axios.get(`${baseUrl}/api/orders/code/${code}`);
}

export default {
  index,
  getById,
  create,
  complete,
  showByCode
};
