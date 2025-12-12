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
    return <p className="app-container">Loading...</p>;
  }

  return (
    <div className="app-container items-list">
      <div className="card">
        <input
          className="search"
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="list" style={{ marginTop: 12 }}>
        {items.length > 0 ? (
          items.map((item) => (
                <div key={item.id} className="item-card card">
              {((item.thumbnail) || (item.images && item.images[0])) && (
                <img src={item.thumbnail || item.images[0]} alt={item.title} className="item-image" />
              )}
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="price">${item.price}</div>
                  <div>
                  <Link to={`/items/${item.id}`} className="btn">View</Link>
                  {isFavorite(item.id) ? (
                    <button type="button" className="btn btn-fav remove" onClick={(e) => { e.stopPropagation(); console.log('remove click', item.id); removeFavorite(String(item.id)); }} style={{ marginLeft: 8 }}>Remove</button>
                  ) : (
                    <button type="button" className="btn btn-fav" onClick={(e) => { e.stopPropagation(); console.log('add click', item.id); addFavorite(item); }} style={{ marginLeft: 8 }}>Fav</button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>

      <div className="pagination card" style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 12px' }}>Page {page}</span>
        <button className="btn" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default ItemsList;