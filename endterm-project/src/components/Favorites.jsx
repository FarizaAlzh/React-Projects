import React from 'react';
import useFavorites from '../hooks/useFavorites';

const Favorites = () => {
  const { favorites, removeFavorite, mergeMessage } = useFavorites();

  return (
    <div>
      <h2>Your Favorites</h2>
      {mergeMessage && <p>{mergeMessage}</p>}
      {favorites.length === 0 ? (
        <p>No items in favorites</p>
      ) : (
        favorites.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            {item.image && <img src={item.image} alt={item.title} width="120" />}
            <button onClick={() => removeFavorite(String(item.id))}>Remove from Favorites</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
