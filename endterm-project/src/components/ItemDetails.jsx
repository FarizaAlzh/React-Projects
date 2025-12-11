import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemDetails } from '../services/apiService';

const ItemDetails = () => {
  const { id } = useParams(); // Получаем ID товара из маршрута
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <h2>{item.name}</h2>
      <img src={item.image} alt={item.name} />
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Category: {item.category}</p>
      <p>Rating: {item.rating}</p>
      <p>Stock: {item.stock}</p>
      <p>Brand: {item.brand}</p>
      <p>Discount: {item.discountPercentage}%</p>
    </div>
  );
};

export default ItemDetails;
