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

export function renderWithTemplate(template, parent, data, callback) {
  parent.insertAdjacentHTML('afterbegin', template);
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

async function convertToText(res) {
  if (res.ok) {
    return await res.text();
  } else {
    throw new Error('Bad Response');
  }
}

export async function loadTemplate(path) {
  const data = await fetch(path);
  const html = await data.text();
  const template = document.createElement('template');
  template.innerHTML = `${html}`;
  return template;
}

export async function loadHeaderFooter() {
  // debugger;
  const header = await loadTemplate('../partials/header.html');
  const footer = await loadTemplate('../partials/footer.html');

  const headerHtml = qs('#main-header');
  const footerHtml = qs('#main-footer');

  headerHtml.appendChild(header);

  // renderWithTemplate(header, headerHtml);
  // renderWithTemplate(footer, footerHtml);
}
