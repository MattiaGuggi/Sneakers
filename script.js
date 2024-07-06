import { addToCart, saveCartToJsonFile } from './cart.js';

// Search bar's filter
export function filterResults() {
  let searchInput = document.querySelector('#search-input');
  let cards = document.querySelectorAll('.card');
  let searchTerm = searchInput.value.toLowerCase();
  
  cards.forEach((card) => {
    let title = card.querySelector('.title');
    let filter = title.textContent.toLowerCase();

    // Shows only selected cards
    if (filter.includes(searchTerm)) {
      title.style.position = 'static';
      card.style.display = 'block';

      // Adjusts title and image position based on title's height
      if (window.getComputedStyle(title).getPropertyValue("height").replace("px", "") > 42)
        title.style.transform = 'translateY(-45px)';
    }
    else {
      card.style.display = 'none';
    }
  });
}

// Search bar's activation
export function toggleBar() {
  let input = document.querySelector(".search__input");
  if (input.style.width === "0px" || input.style.width === "") {
    input.style.transition = "width 0.5s ease-in-out";
    input.style.width = "250px";
  }
  else {
    input.style.transition = "width 0.5s ease-in-out";
    input.style.width = "0";
    input.style.padding = "0";
  }
}

// Scrolls the 8 sizes
function scrollSizes() {
  for (let i=0 ; i<48 ; i++) {
    let size = document.querySelector(`#sizes-${i + 1}`);
    if (size) {
      let sizeButtons = size.querySelectorAll('.size-button');

      sizeButtons.forEach(button => {
        let containerRect = size.getBoundingClientRect();
        let buttonRect = button.getBoundingClientRect();

        // Calculate the scroll position to center the button
        let scrollPosition = buttonRect.left - containerRect.left + size.scrollLeft - (containerRect.width / 2) + (buttonRect.width / 2);

        button.addEventListener('click', (event) => {
          event.preventDefault();

          sizeButtons.forEach(btn => {
            btn.classList.remove('selected');
          });

          button.classList.add('selected');
          size.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        });
      });
    }
  }
}

// Adds into the cart page the selected articles
function purchaseBtnEvents() {
  let purchaseBtn = document.querySelectorAll(".purchase");
  
  purchaseBtn.forEach(btn => {
    let card = btn.closest(".card");
    let imgSrc = card.querySelector(".sneaker img").src;
    let sizes = card.querySelectorAll(".sizes");
    let selectedTitle = card.querySelector(".title").innerText;
    let selectedSize, selectedCost, html;

    btn.addEventListener("click", () => {
      sizes.forEach(size => {
        let sizeBtn = size.querySelectorAll(".size-button");

        sizeBtn.forEach(btn => {
          if (btn.classList[1] == "selected")
            html = btn.innerHTML;
        });
      });

      // A size has been selected
      if (html) {
        let line = html.split(" <br> ");
        selectedSize = line[0];
        selectedCost = line[1];
        addToCart(imgSrc, selectedSize, selectedCost, selectedTitle); // Adds the item's card to the cart page
        saveCartToJsonFile(); // Save all the progress into the cart.json
      }
      else
        alert("No size selected");
    });
  });
}

// Box mail's transition
function emailInputEvent() {
  let inputEmail = document.querySelector(".input__field");

  if (inputEmail) {
    inputEmail.addEventListener("click", () => {
      inputEmail.type = inputEmail.type === "email" ? "text" : "email";
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let cardContainer = document.querySelector('.container .scroll .group');
  let leftArrow = document.querySelector("#leftArrow");
  let rightArrow = document.querySelector("#rightArrow");

  if (cardContainer) {
    cardContainer.addEventListener("wheel", (e) => {
      e.preventDefault();
      cardContainer.scrollLeft += e.deltaY;
      cardContainer.style.scrollBehavior = "auto";
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener("click", () => {
      cardContainer.style.scrollBehavior = "smooth";
      cardContainer.scrollLeft += 900;
    });
  }

  if (leftArrow) {
    leftArrow.addEventListener("click", () => {
      cardContainer.style.scrollBehavior = "smooth";
      cardContainer.scrollLeft -= 900;
    });
  }

  scrollSizes();
  purchaseBtnEvents();
  emailInputEvent();
  alert(window.getComputedStyle(document.body).getPropertyValue("width"));
});