const API_URL = 'https://dummyjson.com/products';

export async function getAllItems(query = '') {
  try {
    const response = await fetch(`${API_URL}/search?q=${query}`);
    if (!response.ok) {
      throw new Error('Failed to get items');
    }
    const data = await response.json();
    return data.products; 
  } catch (error) {
    console.error('Error getting items:', error); 
    throw error;  
  }
}

  
export async function getItemById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed getting item id');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error getting item id:', error); 
    throw error;  
  }
}
