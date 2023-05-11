const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const data = await fetch(`${baseURL}products/search/${category}`);
    const json = await convertToJson(data);
    return json.Result;
  }

  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`);
    const json = await convertToJson(products);
    return json.Result;
  }

  async checkout(data) {
    const url = `${baseURL}checkout`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const json = await convertToJson(response);
    return json;
  }
}
