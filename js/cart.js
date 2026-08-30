const CART_KEY = "phoenix-thozha-cart-v1";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartCount();
}

function cartCount() {
  return readCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return readCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function addToCart(item) {
  const cart = readCart();
  const same = cart.find(
    (c) =>
      c.id === item.id &&
      c.color === item.color &&
      c.size === item.size &&
      c.customName === item.customName &&
      c.message === item.message &&
      c.photoNote === item.photoNote
  );
  if (same) {
    same.qty += item.qty;
  } else {
    cart.push({ ...item, lineId: crypto.randomUUID() });
  }
  writeCart(cart);
  document.querySelectorAll(".cart-link").forEach((el) => {
    el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");
  });
}

function updateQty(lineId, qty) {
  const cart = readCart();
  const item = cart.find((c) => c.lineId === lineId);
  if (!item) return;
  item.qty = Math.max(1, qty);
  writeCart(cart);
}

function removeLine(lineId) {
  writeCart(readCart().filter((c) => c.lineId !== lineId));
}

function clearCart() {
  writeCart([]);
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(cartCount());
    el.hidden = cartCount() === 0;
  });
}

function showToast(text) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn, .chip, .qty button");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const size = Math.max(rect.width, rect.height) * 1.2;
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
});
