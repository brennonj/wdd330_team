import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';

const dataSource = new ProductData('tents');

function addProductToCart(product) {
	let cart = [];
	const existingCart = getLocalStorage('so-cart');

	if (existingCart) {
		cart = [...existingCart, product];
	} else {
		cart.push(product);
	}

	setLocalStorage('so-cart', cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
	const product = await dataSource.findProductById(e.target.dataset.id);
	addProductToCart(product);
}

// add listener to Add to Cart button
document
	.getElementById('addToCart')
	.addEventListener('click', addToCartHandler);
