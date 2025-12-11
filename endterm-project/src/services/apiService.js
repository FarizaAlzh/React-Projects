export const fetchItems = async (search = '', limit = 10, page = 1) => {
  try {
    const skip = (page - 1) * limit;
    const url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data.products; 
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

export const fetchItemDetails = async (id) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching item details:', error);
    return null;
  }
};
