const API_URL = 'https://dummyjson.com/products';

export async function getItems(query = '') {
  try {
    const response = await fetch(`${API_URL}/search?q=${query}`);
      if(!response.ok){
        throw new Error('Failed to get items');
      }
    const data = await response.json();
    return data.products; 
  }
  catch(error) {
    console.error('Error getting itmes: ' , error);
    throw error;
  }
}


export async function getItemById (id) {
  try{
    const responseId = await fetch(`${API_URL}/${id}`);
    if(!responseId.ok ){
      throw new Error('Failed getting item id');
    }

    const getItemId = await responseId.json()
    return getItemId;
  }
  catch(error){
    console.error('Error getting item id: ' , error);
    throw error;
  }
}

