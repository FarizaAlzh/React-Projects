import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/apiService';
import { Link } from 'react-router-dom';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems(); 
      setItems(data);
      setLoading(false);
    };
    getItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Items List</h2>
      <div className="items-list">
        {items.length >= 5 ? (
          items.map((item) => ( 
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <Link to={`/items/${item.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>There are less than 5 items available.</p> 
        )}
      </div>
    </div>
  );
};

export default ItemsList;
