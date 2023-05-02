// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const html = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  if (html && parentElement) {
    parentElement.insertAdjacentHTML(position, html.join(""));
  }
}

export function countCartContents() {
  const items = getLocalStorage('so-cart');
  let qty = 0
  if (items) {
    items.forEach((item) => (qty += item.Quantity));
    document.querySelector('.cart-count').innerHTML = qty;
  }
}