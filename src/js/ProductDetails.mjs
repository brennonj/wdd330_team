import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    const cart = document.getElementById('addToCart');
    cart.addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    //First get what is already in localStorage and assign it to a variable (if there is anything, it will come back as an array):
    let cart = getLocalStorage('so-cart');
    //if there was no "cart" already, like you didn't have anything yet, then create an empty array:
    if (!cart) {
      cart = [];
    }
    //now we push the product that the user clicked on with "addtoCart" button to the end of the array
    cart.push(this.product);
    //and then setLocalStorage with the new contents of the cart:
    setLocalStorage('so-cart', cart);
  }

  renderProductDetails() {
    let temp = document.getElementById('productDetail');
    let clone = temp.content.cloneNode(true);

    clone.getElementById('productBrand').textContent = this.product.Brand.Name;
    clone.getElementById('productName').textContent =
      this.product.NameWithoutBrand;
    clone.getElementById('productImg').src = this.product.Image;
    clone.getElementById('productImg').alt = this.product.NameWithoutBrand;
    clone.getElementById(
      'productPrice'
    ).textContent = `$${this.product.FinalPrice}`;
    clone.getElementById('productColor').textContent =
      this.product.Colors[0].ColorName;
    clone.getElementById('productDescription').innerHTML =
      this.product.DescriptionHtmlSimple;
    clone.getElementById('addToCart').setAttribute('data-id', this.product.Id);

    document.getElementsByTagName('main')[0].appendChild(clone);
  }
}
