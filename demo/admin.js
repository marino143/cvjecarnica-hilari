const store = window.HilariStore;
const list = document.querySelector("#admin-product-list");
const loading = document.querySelector("#admin-loading");
const errorPanel = document.querySelector("#admin-error");
const emptyPanel = document.querySelector("#admin-empty");
const searchInput = document.querySelector("#admin-search");
const editor = document.querySelector("#editor-dialog");
const form = document.querySelector("#product-form");
const toast = document.querySelector("#toast");
let products = [];

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"
  })[character]);
}

function notify(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(notify.timer);
  notify.timer = window.setTimeout(() => { toast.hidden = true; }, 2600);
}

function loadProducts() {
  loading.hidden = false;
  errorPanel.hidden = true;
  list.hidden = true;
  window.setTimeout(() => {
    try {
      products = store.getProducts();
      render();
      loading.hidden = true;
      list.hidden = false;
    } catch {
      loading.hidden = true;
      errorPanel.hidden = false;
    }
  }, 180);
}

function render() {
  const query = searchInput.value.trim().toLocaleLowerCase("hr");
  const filtered = products.filter(product => product.name.toLocaleLowerCase("hr").includes(query));
  list.innerHTML = filtered.map(product => `
    <article class="admin-product">
      <img src="${escapeHtml(product.image)}" alt="">
      <div class="admin-product-main">
        <span>${escapeHtml(product.category)}</span>
        <strong>${escapeHtml(product.name)}</strong>
        <small>${store.money(product.price)}</small>
      </div>
      <label class="availability-toggle">
        <input type="checkbox" data-toggle="${escapeHtml(product.id)}" ${product.available ? "checked" : ""}>
        <span>${product.available ? "Dostupno" : "Skriveno"}</span>
      </label>
      <div class="row-actions">
        <button type="button" data-edit="${escapeHtml(product.id)}">Uredi</button>
        <button class="danger-text" type="button" data-delete="${escapeHtml(product.id)}">Obriši</button>
      </div>
    </article>`).join("");
  emptyPanel.hidden = filtered.length !== 0 || (products.length > 0 && query.length > 0);
  if (filtered.length === 0 && products.length > 0 && query.length > 0) {
    emptyPanel.hidden = false;
    emptyPanel.querySelector("strong").textContent = "Nema proizvoda s tim nazivom.";
  } else {
    emptyPanel.querySelector("strong").textContent = "Još nema proizvoda.";
  }
  document.querySelector("#stat-all").textContent = products.length;
  document.querySelector("#stat-live").textContent = products.filter(product => product.available).length;
  document.querySelector("#stat-hidden").textContent = products.filter(product => !product.available).length;
}

function slugify(value) {
  return value.toLocaleLowerCase("hr").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function openEditor(product) {
  form.reset();
  const data = product || {
    id: "", name: "", description: "", price: "", category: "Buketi",
    image: "assets/buket1.jpg", available: true
  };
  document.querySelector("#editor-title").textContent = product ? "Uredi proizvod" : "Novi proizvod";
  for (const field of ["id", "name", "description", "price", "category", "image"]) {
    form.elements[field].value = data[field];
  }
  form.elements.available.checked = data.available;
  document.querySelector("#image-preview").src = data.image;
  editor.showModal();
  window.setTimeout(() => form.elements.name.focus(), 50);
}

function closeEditor() {
  if (editor.open) editor.close();
}

function saveProduct(event) {
  event.preventDefault();
  const values = new FormData(form);
  const existingId = values.get("id");
  let id = existingId || slugify(values.get("name")) || `proizvod-${Date.now()}`;
  if (!existingId) {
    const base = id;
    let suffix = 2;
    while (products.some(product => product.id === id)) id = `${base}-${suffix++}`;
  }
  const product = {
    id,
    name: values.get("name").trim(),
    description: values.get("description").trim(),
    price: Number(values.get("price")),
    category: values.get("category"),
    image: values.get("image"),
    available: form.elements.available.checked
  };
  const index = products.findIndex(item => item.id === id);
  if (index >= 0) products[index] = product;
  else products.unshift(product);
  store.saveProducts(products);
  closeEditor();
  render();
  notify("Proizvod je spremljen.");
}

function resizeImage(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onerror = () => notify("Fotografija se ne može učitati.");
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => notify("Format fotografije nije podržan.");
    image.onload = () => {
      const max = 1200;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.78);
      form.elements.image.value = dataUrl;
      document.querySelector("#image-preview").src = dataUrl;
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

list.addEventListener("click", event => {
  const edit = event.target.closest("[data-edit]");
  const remove = event.target.closest("[data-delete]");
  if (edit) openEditor(products.find(product => product.id === edit.dataset.edit));
  if (remove) {
    const product = products.find(item => item.id === remove.dataset.delete);
    if (product && window.confirm(`Obrisati proizvod "${product.name}"?`)) {
      products = products.filter(item => item.id !== product.id);
      store.saveProducts(products);
      render();
      notify("Proizvod je obrisan.");
    }
  }
});

list.addEventListener("change", event => {
  const toggle = event.target.closest("[data-toggle]");
  if (!toggle) return;
  const product = products.find(item => item.id === toggle.dataset.toggle);
  if (!product) return;
  product.available = toggle.checked;
  store.saveProducts(products);
  render();
  notify(product.available ? "Proizvod je dostupan." : "Proizvod je skriven.");
});

document.querySelector("#add-product").addEventListener("click", () => openEditor());
document.querySelectorAll("[data-add-product]").forEach(button => button.addEventListener("click", () => openEditor()));
document.querySelectorAll("[data-close-editor]").forEach(button => button.addEventListener("click", closeEditor));
document.querySelector("#image-file").addEventListener("change", event => resizeImage(event.target.files[0]));
document.querySelector("#admin-retry").addEventListener("click", loadProducts);
searchInput.addEventListener("input", render);
form.addEventListener("submit", saveProduct);

editor.addEventListener("click", event => {
  if (event.target === editor) closeEditor();
});

document.querySelector("#reset-products").addEventListener("click", () => {
  if (!window.confirm("Vratiti početne demo proizvode? Vaše demo promjene bit će uklonjene.")) return;
  store.resetProducts();
  loadProducts();
  notify("Početni proizvodi su vraćeni.");
});

document.querySelector("#export-products").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "hilari-demo-proizvodi.json";
  link.click();
  URL.revokeObjectURL(link.href);
  notify("Katalog je izvezen.");
});

window.addEventListener("storage", loadProducts);
loadProducts();

