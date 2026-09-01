const PRODUCT_STORAGE_KEY = "phoenix-thozha-products-v1";

const DEFAULT_PRODUCTS = [
  {
    id: "tshirt",
    name: "Instant T-Shirt",
    category: "Apparel",
    price: 450,
    tag: "Bestseller",
    blurb: "Soft cotton tshirt with a name, date, or short quote.",
    description:
      "240 GSM 100% pure cotton, unisex fit. We print your name, photo, or quote on the chest. Pre-shrunk and made to wash well.",
    colors: ["White", "Black", "Navy blue", "Red", "Grey"],
    options: ["name", "message", "size", "photoNote"],
    sizes: ["S", "M", "L", "XL"],
    image: "images/tshirt.jpg",
  },
  {
    id: "mug",
    name: "Custom Mug",
    category: "Drinkware",
    price: 249,
    tag: "Popular",
    blurb: "Ceramic mug with a photo, name, or a line of text.",
    description:
      "350 ml glossy ceramic mug with wrap-around print. Dishwasher-safe. Perfect for birthdays, offices, and morning chai.",
    colors: ["White"],
    options: ["name", "message", "photoNote"],
    image: "images/mug.jpg",
  },
  {
    id: "magic-mug",
    name: "Custom Magic Mug",
    category: "Drinkware",
    price: 399,
    tag: "Popular",
    blurb: "Ceramic mug with a photo, name, or a line of text.",
    description:
      "350 ml glossy ceramic mug with wrap-around print. Dishwasher-safe. Perfect for birthdays, offices, and morning chai.",
    colors: ["Black"],
    options: ["name", "message", "photoNote"],
    image: "images/magicmug.jpg",
  },
  {
    id: "keychain",
    name: "Custom Keychain",
    category: "Accessories",
    price: 99,
    tag: "Under ₹300",
    blurb: "Engraved keychain with initials, a name, or a date.",
    description: "sublimation keychain — easy to gift.",
    colors: ["Natural wood", "Dark wood"],
    options: ["name"],
    image: "images/keychain.jpg",
  },
  {
    id: "bottle",
    name: "Custom Water Bottle",
    category: "Drinkware",
    price: 499,
    tag: "New",
    blurb: "Steel bottle with a name or logo print that lasts.",
    description:
      "750 ml stainless steel bottle, leak-proof lid. We print a name or short design. Keeps drinks cold for hours. Gym, office, or travel.",
    colors: ["white"],
    options: ["name", "message"],
    image: "images/bottle.jpg",
  },
  {
    id: "cap",
    name: "Custom Cap",
    category: "Apparel",
    price: 200,
    tag: "",
    blurb: "Cotton cap with embroidered name or initials.",
    description:
      "Adjustable cotton baseball cap. We embroider a name, initials, or a short word on the front. One size fits most.",
    colors: ["Black", "White"],
    options: ["name", "size"],
    sizes: ["Free size"],
    image: "images/cap.jpg",
  },
  {
    id: "frame",
    name: "Custom Photo Frame",
    category: "Home",
    price: 199,
    tag: "",
    blurb: "Wooden frame with your photo and a short message.",
    description:
      "Wooden frame. We print your photo and a message on quality paper. Stand on a shelf or hang on the wall.",
    colors: ["Oak", "Walnut", "White"],
    sizes: ["4×6", "6×8", "8×12", "12×18", "12×24", "16×24", "20×24", "24×24"],
    options: ["name", "message", "photoNote", "size"],
    image: "images/frame.jpg",
  },
  {
    id: "phone-stand",
    name: "Custom Phone Stand",
    category: "Home",
    price: 299,
    tag: "New",
    blurb: "Desk stand with a name, initial, or a short note.",
    description:
      "Wooden phone stand with a custom engraving. A useful desk decor piece for birthdays, work desks, and gifting moments.",
    colors: ["Walnut", "Oak", "Black"],
    options: ["name", "message"],
    image: "images/frame.jpg",
  },
  {
    id: "notebook",
    name: "Custom Notebook",
    category: "Stationery",
    price: 249,
    tag: "Giftable",
    blurb: "Hardcover journal with initials or a special message.",
    description:
      "A premium diary for daily notes, goals, and memories. Add a name, initials, or a personal line for a memorable gift.",
    colors: ["Beige", "Navy", "Forest"],
    options: ["name", "message"],
    image: "images/mug.jpg",
  },
  {
    id: "badge",
    name: "Custom Name Badge",
    category: "Accessories",
    price: 140,
    tag: "Best value",
    blurb: "Personalised badge for office, students, or events.",
    description:
      "Metal or acrylic badge with name and title. Great for offices, schools, family events, and team gifting.",
    colors: ["Gold", "Silver", "Black"],
    options: ["name", "message"],
    image: "images/keychain.jpg",
  },
];

function getProducts() {
  try {
    const stored = JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY) || "null");
    if (Array.isArray(stored) && stored.length) {
      return stored;
    }
  } catch {
    // ignore invalid storage data and fall back to defaults
  }

  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}

const PRODUCTS = getProducts();

function formatPrice(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getCategories() {
  return ["All", ...new Set(PRODUCTS.map((p) => p.category))];
}

function productCard(p) {
  return `
    <article class="card">
      <a class="card-img" href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}" data-product-id="${p.id}" />
      </a>
      <div class="card-body">
        <span class="tag">${p.tag || p.category}</span>
        <strong>${p.name}</strong>
        <span class="muted">${p.blurb}</span>
        <span class="price">${formatPrice(p.price)}</span>
        <a class="btn btn-primary" href="product.html?id=${p.id}">Customise</a>
      </div>
    </article>`;
}
