import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParams } from './utils.mjs';

loadHeaderFooter();

//get the category
const category = getParams('category');
//put the category up at the top of the page (Tents, Backpacks, etc.)
document.querySelector('.title').innerHTML = category;
// first create an instance of our ProductData class.
const dataSource = new ProductData();
// then get the element we want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show our products
myList.init();
