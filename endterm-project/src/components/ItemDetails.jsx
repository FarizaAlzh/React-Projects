import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemDetails } from '../services/apiService';
import useFavorites from '../hooks/useFavorites';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = useMemo(
    () => favorites.some((favorite) => favorite.id === String(id)),
    [favorites, id]
  );

  useEffect(() => {
    const getItemDetails = async () => {
      const data = await fetchItemDetails(id);
      setItem(data);
      setLoading(false);
    };
    getItemDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div>
      <h2>{item.name || item.title}</h2>
      <img src={item.image || item.thumbnail} alt={item.name || item.title} />
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Category: {item.category}</p>
      <p>Rating: {item.rating}</p>
      <p>Stock: {item.stock}</p>
      <p>Brand: {item.brand}</p>
      <p>Discount: {item.discountPercentage}%</p>
      {isFavorite ? (
        <button onClick={() => removeFavorite(String(item.id))}>Remove from favorites</button>
      ) : (
        <button onClick={() => addFavorite(item)}>Add to favorites</button>
      )}
    </div>
  );
};

export default ItemDetails;