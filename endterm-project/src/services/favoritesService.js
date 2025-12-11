const FAVORITES_KEY = 'favorites'; 

export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (item) => {
  const favorites = getFavorites();
  favorites.push(item);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const removeFromFavorites = (itemId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(item => item.id !== itemId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
};

