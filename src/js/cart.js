import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.cart-product-list').innerHTML = htmlItems.join('');
    addEventListenersToRemoveBtns(cartItems);
  }
  renderTotal(cartItems);
}

function addEventListenersToRemoveBtns(cartItems) {
  cartItems.forEach((item) => {
    const removeBtn = document.querySelector(`[data-id="${item.Id}"]`);

    removeBtn.addEventListener('click', () => {
      const cartItems = getLocalStorage('so-cart');
      const targetItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.Id === item.Id
      );
      cartItems.splice(targetItemIndex, 1);
      setLocalStorage('so-cart', cartItems);
      renderCartContents();
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <div class="remove-item" title="Remove Item">
    <button data-id="${item.Id}">x</button>
  </div>
  <a href=../product_pages/index.html?product=${item.Id} class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href=../product_pages/index.html?product=${item.Id} class=" cart-card__desc">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

function calculateTotal(items) {
  let total = 0;
  items.forEach((item) => (total += item.FinalPrice * item.Quantity));
  return total;
}

function renderTotal(cartItems) {
  const htmlCartFooter = document.querySelector('.cart-footer');
  if (cartItems.length) {
    const total = calculateTotal(cartItems);
    document.querySelector('.cart-total').innerHTML = total.toFixed(2);

    if (htmlCartFooter.classList.contains('hide')) {
      htmlCartFooter.classList.remove('hide');
    }
  } else {
    if (!htmlCartFooter.classList.contains('hide')) {
      htmlCartFooter.classList.add('hide');
    }
  }
}
