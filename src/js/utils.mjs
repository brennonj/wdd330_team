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

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {
  const html = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = '';
  }
  if (html && parentElement) {
    parentElement.insertAdjacentHTML(position, html.join(''));
  }
}

export function renderWithTemplate(
  template,
  parent,
  callback,
  data,
  position = 'afterbegin'
) {
  parent.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
}

export function countCartContents() {
  const items = getLocalStorage('so-cart');
  let qty = 0;
  if (items) {
    items.forEach((item) => (qty += item.Quantity));
  }
  document.querySelector('.cart-count').innerHTML = qty;
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (res.ok) {
    return await res.text();
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const headerHtml = qs('#main-header');
  renderWithTemplate(headerTemplate, headerHtml, countCartContents);

  const footerTemplate = await loadTemplate('../partials/footer.html');
  const footerHtml = qs('#main-footer');
  renderWithTemplate(footerTemplate, footerHtml);
}
