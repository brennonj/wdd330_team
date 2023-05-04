const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() {}
  async getData(category) {
    const data = await fetch(`${baseURL}products/search/${category}`);
    const json = await convertToJson(data);
    return json.Result;
  }
  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`);
    const json = await convertToJson(products);
    console.log({json});
    return json.Result;
  }
}
