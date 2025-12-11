export const fetchItems = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
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

