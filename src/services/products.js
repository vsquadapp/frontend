const products = [
  {
    id: 1,
    img: "medias/celular.webp",
    infos: [],
    price: 200,
    comission_type: "percentage",
    deliveryType: "1",
    deliveryLabel: "Apenas retirada pessoalmente",
    deliveryValue: 0,
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
    deliveryType: "2",
    deliveryLabel: "Apenas entrega",
    deliveryValue: "R$ 10,00",
    comission_value: 0.05,
    name: "Caixa Coleção Harry Potter - 7 Volumes - Box",
    description: `Maior fenômeno editorial de todos os tempos, com mais de 450 milhões de exemplares vendidos em 70 idiomas, a série Harry Potter chega às prateleiras em mais essa edição de colecionador. Os sete livros da saga criada por J. K. Rowling - que acompanha a jornada do adorado aprendiz de bruxo contra o maléfico Voldemort, - ganham novas capas e novas ilustrações e vêm num box exclusivo. Uma novidade capaz de conquistar os mais exigentes fãs, ávidos por novidades ligadas ao universo da saga, e também os novos leitores.`,
    ordered: 0,
    category: "Livros",
    stock: 1,
    infos: [
      { key: "Título do livro", value: "Caixa Harry Potter - Edição Premium" },
      { key: "Autor", value: "J. K. Rowling" },
      { key: "Idioma", value: "Protuguês" }
    ]
  },
  {
    id: 3,
    infos: [],
    img: "medias/nitendo.webp",
    price: 1299.9,
    comission_type: "fixed",
    deliveryType: "3",
    deliveryLabel: "Entrega e retirada pessoalmente",
    deliveryValue: "R$ 15,00",
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
