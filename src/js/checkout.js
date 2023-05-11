import CheckoutProcess from './CheckoutProcess.mjs';
import ExternalServices from './ExternalServices.mjs';

const dataSource = new ExternalServices();

const checkoutProcess = new CheckoutProcess('so-cart', dataSource);
checkoutProcess.init();

const checkoutForm = document.querySelector('#checkout-form');
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkoutProcess.checkout(checkoutForm);
});
