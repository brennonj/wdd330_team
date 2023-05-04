import { renderListWithTemplate } from './utils.mjs';

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    // const filterResults = this.filterResults(list);
    console.log({list});
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list
    );
  }

  filterResults(arr) {
    const filterCriteria = ['880RR', '985RF', '985PR', '344YJ'];
    return filterCriteria.map((id) => arr.filter((item) => item.Id === id)[0]);
  }
}

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <div class="listing-img">
    <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
  </div>
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}
