import {
  calculateTotal,
  countCartContents,
  getLocalStorage,
  setLocalStorage,
  qs,
  formDataToJSON,
  alertMessage,
} from './utils.mjs';

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.Quantity,
  }));
}

export default class CheckoutProcess {
  constructor(key, dataSource) {
    this.key = key;
    this.dataSource = dataSource;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    this.itemTotal = calculateTotal();
  }

  calculateOrderTotal() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = 2 * (countCartContents() - 1) + 10;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal =
      Math.round((this.shipping + this.tax + this.itemTotal) * 100) / 100;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    qs('.cart-total').innerHTML = `$${this.itemTotal.toFixed(2)}`;
    qs('.tax').innerHTML = `$${this.tax.toFixed(2)}`;
    qs('.shipping').innerHTML = `$${this.shipping.toFixed(2)}`;
    qs('.order-total').innerHTML = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form

    let jsonFormData = formDataToJSON(form);
    jsonFormData.items = packageItems(this.list);
    jsonFormData.orderTotal = this.orderTotal;
    jsonFormData.shipping = this.shipping;
    jsonFormData.tax = this.tax;
    jsonFormData.orderDate = new Date();

    // call the checkout method in our ExternalServices module and send it our data object.
    try {
      const response = await this.dataSource.checkout(jsonFormData);
      console.log({ response });
      setLocalStorage('so-cart', []);
      location.assign('/checkout/success.html');
    } catch (e) {
      for (let message in e.message) {
        alertMessage(e.message[message]);
      }

      console.log({ e });
    }
  }
}
