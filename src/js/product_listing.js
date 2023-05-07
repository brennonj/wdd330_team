import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { getParams } from './utils.mjs';

const element = document.querySelector('.product-list');
const category = getParams('category');
const dataSource = new ProductData();
const listing = new ProductListing(category.toLowerCase(), dataSource, element);
document.querySelector('#category').innerText = category;
const sortSelect = document.querySelector('#sort-select');

sortSelect.addEventListener('change', () => {
  const sortCriteria = sortSelect.value;
  if (sortCriteria === 'name') {
    listing.sortByName();
  } else if (sortCriteria === 'price') {
    listing.sortByPrice();
  }
});

listing.init();
