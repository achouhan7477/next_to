// services.js
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

// Fetch products
export const getProducts = async (limit = 100) => {
  try {
    const res = await axios.get(`${BASE_URL}/products?limit=${limit}`);
    return res.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
