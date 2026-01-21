function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(name, price) {
  let cart = getCart();
  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
}

function renderCart() {
  let cart = getCart();
  let container = document.getElementById("cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cart.forEach(item => {
    container.innerHTML += `
      <div class="cart-item">
        ${item.name} x${item.qty} — ${item.price * item.qty} SAR
      </div>
    `;
  });
}

function orderWhatsApp() {
  let cart = getCart();
  if (cart.length === 0) {
    alert("السلة فارغة");
    return;
  }

  let message = "Hello! I’d like to order  :%0A%0A";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} x${item.qty} - ${item.price * item.qty} SAR%0A`;
    total += item.price * item.qty;
  });

  message += `%0A_Total: ${total} SAR`;

  const phone = "966508321241"; 
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

  clearCart(); 
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
}

renderCart();