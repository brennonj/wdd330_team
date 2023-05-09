import { check } from 'prettier';
import {
  calculateTotal,
  countCartContents,
  getLocalStorage,
} from './utils.mjs';

const subtotal = calculateTotal();
document.querySelector('.cart-total').innerHTML = subtotal.toFixed(2);

const tax = subtotal * 0.06;
document.querySelector('.tax').innerHTML = tax.toFixed(2);

const amountOfItems = countCartContents() - 1;

const shipping = 10 + 2 * amountOfItems;

document.querySelector('.shipping').innerHTML = shipping;

const orderTotal = subtotal + tax + shipping;

document.querySelector('.order-total').innerHTML = orderTotal.toFixed(2);

let checkoutForm = document.forms.checkoutForm;
checkoutForm.addEventListener('submit', () => {
  const items = getLocalStorage('so-cart');
  const formattedItems = packageItems(items);
  const formData = formDataToJSON(checkoutForm)
});

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.Quantity,
  }));
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// export default class CheckoutProcess {

//   async checkout(form) {
//     // build the data object from the calculated fields, the items in the cart, and the information entered into the form

//     // call the checkout method in our ExternalServices module and send it our data object.
//   }
// }
