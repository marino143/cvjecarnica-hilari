const STORE_KEY = "hilari-demo-products-v1";
const CART_KEY = "hilari-demo-cart-v1";

const seedProducts = [
  {
    id: "romanticni-buket",
    name: "Romantični buket",
    description: "Klasičan buket za posebnu osobu, složen od ruža i sezonskog zelenila.",
    price: 35,
    category: "Buketi",
    image: "assets/buket1.jpg",
    available: true,
    featured: true
  },
  {
    id: "proljetni-buket",
    name: "Proljetni buket",
    description: "Vedra kombinacija svježeg cvijeća u nježnim i toplim tonovima.",
    price: 29,
    category: "Buketi",
    image: "assets/buket2.jpg",
    available: true
  },
  {
    id: "mijesani-buket",
    name: "Miješani buket",
    description: "Bogat buket sezonskog cvijeća koji se slaže prema trenutačnoj ponudi.",
    price: 42,
    category: "Buketi",
    image: "assets/buket3.jpg",
    available: true
  },
  {
    id: "flower-box-ruze",
    name: "Flower box s ružama",
    description: "Raskošne ruže aranžirane u elegantnoj okrugloj kutiji.",
    price: 49,
    category: "Flower box",
    image: "assets/flowerbox1.jpg",
    available: true
  },
  {
    id: "flower-box-mix",
    name: "Flower box mix",
    description: "Razigrana kombinacija cvijeća u kutiji, prikladna za rođendane i zahvale.",
    price: 45,
    category: "Flower box",
    image: "assets/flowerbox2.jpg",
    available: true
  },
  {
    id: "njezni-flower-box",
    name: "Nježni flower box",
    description: "Pastelni cvjetni aranžman u kutiji s urednim završnim detaljima.",
    price: 39,
    category: "Flower box",
    image: "assets/flowerbox3.jpg",
    available: false
  },
  {
    id: "stolni-aranzman",
    name: "Stolni aranžman",
    description: "Svečani aranžman za stol, izrađen prema prigodi i prostoru.",
    price: 55,
    category: "Aranžmani",
    image: "assets/aranzmani1.jpg",
    available: true
  },
  {
    id: "elegantni-aranzman",
    name: "Elegantni aranžman",
    description: "Viši cvjetni aranžman za darivanje, proslave i poslovne prilike.",
    price: 65,
    category: "Aranžmani",
    image: "assets/aranzmani2.jpg",
    available: true
  }
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getProducts() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) return clone(seedProducts);
  try {
    const products = JSON.parse(raw);
    return Array.isArray(products) ? products : clone(seedProducts);
  } catch {
    throw new Error("Katalog se ne može učitati.");
  }
}

function saveProducts(products) {
  localStorage.setItem(STORE_KEY, JSON.stringify(products));
  window.dispatchEvent(new CustomEvent("hilari:products"));
}

function resetProducts() {
  localStorage.removeItem(STORE_KEY);
  window.dispatchEvent(new CustomEvent("hilari:products"));
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("hilari:cart"));
}

function money(value) {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

window.HilariStore = {
  seedProducts,
  getProducts,
  saveProducts,
  resetProducts,
  getCart,
  saveCart,
  money
};

