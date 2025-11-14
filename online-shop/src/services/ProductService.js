const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (query = '') => {
  try {
    const response = await fetch(`${API_URL}/search?q=${query}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch product details');
  }
};
