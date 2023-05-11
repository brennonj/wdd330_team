import CheckoutProcess from './CheckoutProcess.mjs';
import ExternalServices from './ExternalServices.mjs';

const dataSource = new ExternalServices();

document.querySelector('#fname').value = 'test';
document.querySelector('#lname').value = 'test';
document.querySelector('#street').value = 'test';
document.querySelector('#city').value = 'test';
document.querySelector('#state').value = 'test';
document.querySelector('#zip').value = 'test';
document.querySelector('#cardNumber').value = '12341234123412';

const checkoutProcess = new CheckoutProcess('so-cart', dataSource);
checkoutProcess.init();

const checkoutForm = document.querySelector('#checkout-form');
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  checkoutProcess.checkout(checkoutForm);
});
