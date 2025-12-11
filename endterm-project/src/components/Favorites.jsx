import React from 'react';

const useFavorites = () => {
  const FAVORITES_KEY = 'favorites';
  const [favorites, setFavorites] = React.useState(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, item];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((item) => item.id !== itemId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return { favorites, addFavorite, removeFavorite };
};

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No items in favorites</p>
      ) : (
        favorites.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <button onClick={() => removeFavorite(item.id)}>Remove from Favorites</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
