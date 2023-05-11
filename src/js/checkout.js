import CheckoutProcess from './CheckoutProcess.mjs';
import ExternalServices from './ExternalServices.mjs';

document.querySelector('[name="fname"]').value = 'test';
document.querySelector('[name="lname"]').value = 'test';
document.querySelector('[name="street"]').value = 'test';
document.querySelector('[name="city"]').value = 'test';
document.querySelector('[name="state"]').value = 'test';
document.querySelector('[name="zip"]').value = 'test';
// document.querySelector('[name="cardNumber"]').value = 'test';
document.querySelector('[name="expiration"]').value = '8/29';
// document.querySelector('[name="code"]').value = 'test';

const dataSource = new ExternalServices();

const checkoutProcess = new CheckoutProcess('so-cart', dataSource);
checkoutProcess.init();

const checkoutForm = document.querySelector('#checkout-form');
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkoutProcess.checkout(checkoutForm);
});
