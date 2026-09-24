const store = window.HilariStore;
const grid = document.querySelector("#product-grid");
const loading = document.querySelector("#catalog-loading");
const errorPanel = document.querySelector("#catalog-error");
const emptyPanel = document.querySelector("#catalog-empty");
const searchInput = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const cartDrawer = document.querySelector("#cart-drawer");
const cartBackdrop = document.querySelector("#drawer-backdrop");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");
const cartTotal = document.querySelector("#cart-total");
const cartCount = document.querySelector("#cart-count");
const productDialog = document.querySelector("#product-dialog");
const checkoutDialog = document.querySelector("#checkout-dialog");
let products = [];

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"
  })[character]);
}

function loadProducts() {
  loading.hidden = false;
  errorPanel.hidden = true;
  grid.hidden = true;
  window.setTimeout(() => {
    try {
      products = store.getProducts();
      fillCategories();
      renderProducts();
      loading.hidden = true;
      grid.hidden = false;
    } catch {
      loading.hidden = true;
      errorPanel.hidden = false;
    }
  }, 240);
}

function fillCategories() {
  const selected = categoryFilter.value;
  const categories = [...new Set(products.map(product => product.category))].sort();
  categoryFilter.innerHTML = '<option value="Sve">Sve kategorije</option>' + categories
    .map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("");
  if (["Sve", ...categories].includes(selected)) categoryFilter.value = selected;
}

function productCard(product) {
  const status = product.available ? "Dostupno" : "Trenutačno nedostupno";
  return `
    <article class="product-card ${product.available ? "" : "unavailable"}">
      <button class="product-image-button" type="button" data-view="${escapeHtml(product.id)}" aria-label="Detalji proizvoda ${escapeHtml(product.name)}">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">
        <span class="availability ${product.available ? "is-live" : ""}">${status}</span>
      </button>
      <div class="product-info">
        <p class="product-category">${escapeHtml(product.category)}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <div class="product-bottom">
          <strong>${store.money(product.price)}</strong>
          <button type="button" data-add="${escapeHtml(product.id)}" ${product.available ? "" : "disabled"}>${product.available ? "Dodaj u košaricu" : "Nedostupno"}</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("hr");
  const category = categoryFilter.value;
  const filtered = products.filter(product => {
    const matchesQuery = `${product.name} ${product.description}`.toLocaleLowerCase("hr").includes(query);
    return matchesQuery && (category === "Sve" || product.category === category);
  });
  grid.innerHTML = filtered.map(productCard).join("");
  emptyPanel.hidden = filtered.length !== 0;
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId && item.available);
  if (!product) return;
  const cart = store.getCart();
  const item = cart.find(entry => entry.id === productId);
  if (item) item.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  store.saveCart(cart);
  renderCart();
  openCart();
}

function updateCart(productId, change) {
  const cart = store.getCart();
  const item = cart.find(entry => entry.id === productId);
  if (!item) return;
  item.quantity += change;
  store.saveCart(cart.filter(entry => entry.quantity > 0));
  renderCart();
}

function renderCart() {
  const cart = store.getCart();
  const detailed = cart.map(item => ({ ...item, product: products.find(product => product.id === item.id) })).filter(item => item.product);
  const count = detailed.reduce((sum, item) => sum + item.quantity, 0);
  const total = detailed.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  cartCount.textContent = count;
  cartItems.innerHTML = detailed.map(item => `
    <article class="cart-item">
      <img src="${escapeHtml(item.product.image)}" alt="">
      <div><strong>${escapeHtml(item.product.name)}</strong><span>${store.money(item.product.price)}</span>
        <div class="quantity" aria-label="Količina za ${escapeHtml(item.product.name)}">
          <button type="button" data-cart-minus="${escapeHtml(item.id)}" aria-label="Smanji količinu">−</button>
          <span>${item.quantity}</span>
          <button type="button" data-cart-plus="${escapeHtml(item.id)}" aria-label="Povećaj količinu">+</button>
        </div>
      </div>
    </article>`).join("");
  cartEmpty.hidden = detailed.length > 0;
  cartSummary.hidden = detailed.length === 0;
  cartTotal.textContent = store.money(total);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.querySelector("#open-cart").setAttribute("aria-expanded", "true");
  cartBackdrop.hidden = false;
  document.body.classList.add("no-scroll");
  document.querySelector("#close-cart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.querySelector("#open-cart").setAttribute("aria-expanded", "false");
  cartBackdrop.hidden = true;
  document.body.classList.remove("no-scroll");
  document.querySelector("#open-cart").focus();
}

function showProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;
  document.querySelector("#product-dialog-content").innerHTML = `
    <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
    <div class="product-dialog-copy"><p class="eyebrow">${escapeHtml(product.category)}</p><h2>${escapeHtml(product.name)}</h2>
      <p>${escapeHtml(product.description)}</p><strong>${store.money(product.price)}</strong>
      <button class="primary-action wide" type="button" data-dialog-add="${escapeHtml(product.id)}" ${product.available ? "" : "disabled"}>${product.available ? "Dodaj u košaricu" : "Trenutačno nedostupno"}</button>
    </div>`;
  productDialog.showModal();
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

grid.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const viewButton = event.target.closest("[data-view]");
  if (addButton) addToCart(addButton.dataset.add);
  if (viewButton) showProduct(viewButton.dataset.view);
});

cartItems.addEventListener("click", event => {
  const minus = event.target.closest("[data-cart-minus]");
  const plus = event.target.closest("[data-cart-plus]");
  if (minus) updateCart(minus.dataset.cartMinus, -1);
  if (plus) updateCart(plus.dataset.cartPlus, 1);
});

productDialog.addEventListener("click", event => {
  const addButton = event.target.closest("[data-dialog-add]");
  if (event.target.closest("[data-close-dialog]")) closeDialog(productDialog);
  if (addButton) {
    closeDialog(productDialog);
    addToCart(addButton.dataset.dialogAdd);
  }
});

document.querySelector("#open-cart").addEventListener("click", openCart);
document.querySelector("#close-cart").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
document.querySelector("#clear-filters").addEventListener("click", () => { searchInput.value = ""; categoryFilter.value = "Sve"; renderProducts(); });
document.querySelector("#retry-catalog").addEventListener("click", loadProducts);

document.querySelector("#open-checkout").addEventListener("click", () => {
  closeCart();
  document.querySelector("#checkout-form").hidden = false;
  document.querySelector("#order-success").hidden = true;
  checkoutDialog.showModal();
});

document.querySelector("#delivery-method").addEventListener("change", event => {
  const addressField = document.querySelector("#address-field");
  const addressInput = addressField.querySelector("input");
  const needsAddress = event.target.value === "dostava";
  addressField.hidden = !needsAddress;
  addressInput.required = needsAddress;
});

document.querySelector("#checkout-form").addEventListener("submit", event => {
  event.preventDefault();
  event.currentTarget.hidden = true;
  document.querySelector("#order-success").hidden = false;
});

document.querySelector("#finish-demo").addEventListener("click", () => {
  store.saveCart([]);
  renderCart();
  checkoutDialog.close();
});

checkoutDialog.addEventListener("click", event => {
  if (event.target.closest("[data-close-dialog]")) closeDialog(checkoutDialog);
});

for (const dialog of [productDialog, checkoutDialog]) {
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
}

window.addEventListener("storage", () => { loadProducts(); renderCart(); });
window.addEventListener("hilari:products", loadProducts);
loadProducts();
renderCart();

