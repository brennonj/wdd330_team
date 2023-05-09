import { calculateTotal, countCartContents } from './utils.mjs';

const subtotal = calculateTotal();

document.querySelector('.cart-total').innerHTML = subtotal.toFixed(2);

const tax = (subtotal * 0.06);

document.querySelector('.tax').innerHTML = tax.toFixed(2);

const amountOfItems = countCartContents() - 1;

const shipping = 10 + (2 * amountOfItems);

document.querySelector('.shipping').innerHTML = shipping;

const orderTotal = subtotal + tax + shipping;

document.querySelector('.order-total').innerHTML = orderTotal.toFixed(2);