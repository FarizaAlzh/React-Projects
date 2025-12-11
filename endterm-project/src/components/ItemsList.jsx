import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/apiService';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';  

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');  
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [page, setPage] = useState(1); 
  const [totalItems, setTotalItems] = useState(0); 

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const debounceSearch = debounce((search) => {
      setDebouncedSearchTerm(search);  
    }, 500); 
    debounceSearch(searchTerm);

    return () => {
      debounceSearch.cancel();  
    };
  }, [searchTerm]);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems(debouncedSearchTerm, 10, page); 
      setItems(data);
      setLoading(false);
    };

    const getTotalItems = async () => {
      const response = await fetch(`https://dummyjson.com/products/search?q=${debouncedSearchTerm}`);
      const data = await response.json();
      setTotalItems(data.total);  
    };

    if (debouncedSearchTerm || page) {
      getItems();
      getTotalItems();
    }
  }, [debouncedSearchTerm, page]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const totalPages = Math.ceil(totalItems / 10);  

  return (
    <div>
      <h2>Items List</h2>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={handleSearchChange}  
      />
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

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ItemsList;
