import { renderListWithTemplate } from './utils.mjs';

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    this.list = await this.dataSource.getData(this.category);
    renderListWithTemplate(productCardTemplate, this.listElement, this.list);
  }

  filterResults(arr) {
    const filterCriteria = ['880RR', '985RF', '985PR', '344YJ'];
    return filterCriteria.map((id) => arr.filter((item) => item.Id === id)[0]);
  }

  render() {
    const listHtml = this.list.map(productCardTemplate).join('');
    this.listElement.innerHTML = listHtml;
  }

  sortByPrice() {
    this.list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    this.render();
  }

  sortByName() {
    this.list.sort((a, b) => a.Name.localeCompare(b.Name));
    this.render();
  }
}

function productCardTemplate(product) {
  let screenWidth = screen.width;
  let imageSource = product.Images.PrimarySmall;
  if (screenWidth > 640) {
    imageSource = product.Images.PrimaryMedium;
  }
  if (screenWidth > 1200) {
    imageSource = product.Images.PrimaryLarge;
  }
  if (screenWidth > 1500) {
    imageSource = product.Images.PrimaryExtraLarge;
  }
  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
    <div class="listing-img">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}" />
    </div>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price mt mb">
      <span class="full-price">$${product.SuggestedRetailPrice}</span>
    </p>
    <p class="product-card__price">
      <span class="discount">$${product.FinalPrice}</span>
    </p>
  </a>
</li>`;
}
