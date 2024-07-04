import { updateCartCounter } from './header.js';

function createElements(item) {
  let cartItemElement = document.createElement('div');
  cartItemElement.classList.add('cart-item');   

  let title = document.createElement("p");
  let img = document.createElement("img");
  let div = document.createElement("div");
  title.innerText = item.title;
  title.classList.add("cart-title");
  img.src = item.imgSrc;
  img.style.width = "16rem";
  img.classList.add("cartImg");
  div.classList.add("details");

  cartItemElement.appendChild(title);
  cartItemElement.appendChild(img);

  let size = document.createElement("p");
  let cost = document.createElement("p");
  let del = document.createElement("button");
  let order = document.createElement("button");
  let btnGroup = document.createElement("div");

  btnGroup.classList.add("btn-group");
  del.classList.add("remove-item");
  del.innerText = "Delete ";
  del.innerHTML += '<i class="fa fa-trash"></i>';
  order.classList.add("order-item");
  order.innerText = "Order ";
  size.innerText = `Size: ${item.size}`;
  cost.innerText = `Cost: ${item.cost}`;

  btnGroup.appendChild(del);
  btnGroup.appendChild(order);

  div.appendChild(size);
  div.appendChild(cost);
  div.appendChild(btnGroup);

  cartItemElement.appendChild(div);
  document.querySelector('.cartContainer').appendChild(cartItemElement);

  order.addEventListener('click', () => {
    alert("Order placed");
  });

  del.addEventListener('click', () => {
    cartItemElement.remove(); // Remove the cart item from DOM
    removeFromCart(item); // Remove the item from localStorage
    saveCartToJsonFile(); // Saves into cart.json the items
  });
}

function removeFromCart(cartItem) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Find index of the cart item to remove
  let index = cart.findIndex(item => (
    item.imgSrc === cartItem.imgSrc &&
    item.size === cartItem.size &&
    item.cost === cartItem.cost &&
    item.title === cartItem.title
  ));
  
  // Didn't find the item or doesn't exist
  if (index !== -1) {
    cart.splice(index, 1); // Remove item from array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage

    // Empty cart
    if (cart.length === 0)
      document.querySelector('.cartContainer').innerHTML = '<h1 style="padding: 45px;">Your cart is empty</h1>';
  }
}

// Add to cart
export function addToCart(imgSrc, size, cost, title) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve the cart from localStorage
  let cartItems = {imgSrc, size, cost, title}; // Object used to save into localStorage
  cart.push(cartItems); // Adds an item with the previous details
  localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
}

// Saves to cart.json
export function saveCartToJsonFile() {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve the cart from localStorage

  // Send the cart data to the server
  fetch('/save-cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cart)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log("Cart saved successfully!");
    }
    else {
      console.error("Error saving cart:", data.message);
    }
  })
  .catch(error => console.error("Fetch error:", error));

  updateCartCounter(); // Updates the counter
}

document.addEventListener('DOMContentLoaded', () => {
    let cartContainer = document.querySelector('.cartContainer');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0 && cartContainer)
      cartContainer.innerHTML = '<h1 style="padding: 45px;">Your cart is empty</h1>';
    else {
      cart.forEach(item => {
        createElements(item); // Creates the item's card based on the cart.json
      });
    }
});