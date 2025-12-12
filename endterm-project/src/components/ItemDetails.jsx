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
    <div className="app-container item-details card">
      <div>
        <img
          src={
            item.thumbnail || (Array.isArray(item.images) ? item.images[0] : item.images) || ''
          }
          alt={item.name || item.title}
        />
      </div>
      <div className="info">
        <h2>{item.name || item.title}</h2>
        <p className="muted">{item.description}</p>
        <p className="price">Price: ${item.price}</p>
        <p>Category: {item.category}</p>
        <p>Rating: {item.rating}</p>
        <p>Stock: {item.stock}</p>
        <p>Brand: {item.brand}</p>
        <p>Discount: {item.discountPercentage}%</p>
        <div style={{ marginTop: 12 }}>
          {isFavorite ? (
            <button type="button" className="btn secondary" onClick={(e) => { e.stopPropagation(); console.log('remove detail', item.id); removeFavorite(String(item.id)); }}>Remove from favorites</button>
          ) : (
            <button type="button" className="btn" onClick={(e) => { e.stopPropagation(); console.log('add detail', item.id); addFavorite(item); }}>Add to favorites</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;