import axios from 'axios';

async function getProductList() {
  try {
    const { data = [] } = await axios.get('https://fakestoreapi.com/products');
    return data;
  } catch (e) {
    return e || e.message;
  }
}

export { getProductList };
