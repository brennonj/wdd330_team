import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card_brand">${product.Brand.Name}</h3>
  <h2 class="card_name">${product.Name}</h2>
  <p class="product-card_price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.sort = null;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);

    document.querySelector('.title').innerHTML = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  sortList(sortCriteria) {
    this.sort = sortCriteria;

    const listItems = [...this.listElement.children];
    listItems.sort((a, b) => {
      const aData = a.querySelector(
        '.card_name, .product-card_price'
      ).textContent;
      const bData = b.querySelector(
        '.card_name, .product-card_price'
      ).textContent;

      if (this.sort === 'name') {
        return aData.localeCompare(bData);
      } else if (this.sort === 'price') {
        const aPrice = parseFloat(aData.slice(1));
        const bPrice = parseFloat(bData.slice(1));
        return aPrice - bPrice;
      }
    });

    this.listElement.innerHTML = '';
    listItems.forEach((item) => this.listElement.appendChild(item));
  }
}
