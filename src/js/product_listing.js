import ProductData from './ProductData.mjs';
import ProductListing from './ProductList.mjs';
import { getParams } from './utils.mjs';

const element = document.querySelector('.product-list');
const category = getParams('category');
const dataSource = new ProductData();
const listing = new ProductListing(category.toLowerCase(), dataSource, element);

listing.init();

document.querySelector('#category').innerText = category;