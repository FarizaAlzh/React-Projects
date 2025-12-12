import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import { fetchItems } from '../services/apiService';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
 
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems(debouncedSearchTerm, 10, page);
      setItems(data);
      setLoading(false);
    };
    getItems();
  }, [debouncedSearchTerm, page]);

  const isFavorite = (id) => favorites.some((fav) => fav.id === String(id));

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="items-list">
        {items.length >= 5 ? (
          items.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <Link to={`/items/${item.id}`}>View Details</Link>
              {isFavorite(item.id) ? (
                <button onClick={() => removeFavorite(String(item.id))}>Remove from favorites</button>
              ) : (
                <button onClick={() => addFavorite(item)}>Add to favorites</button>
              )}
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ItemsList;