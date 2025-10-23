import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';  
import ProductList from './components/ProductList';  
import './App.css';  

const App = () => {
  const [products, setProducts] = useState([]);  
  const [filteredProducts, setFilteredProducts] = useState([]);  
  const [query, setQuery] = useState('');  
  const [category, setCategory] = useState('');  
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);  
        setFilteredProducts(data);  
      } catch (error) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);  
  };

  const clearSearch = () => {
    setQuery('');
    setFilteredProducts(products);  
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    if (category === '') {
      setFilteredProducts(products);  
    } else {
      const filteredByCategory = products.filter((product) =>
        product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filteredByCategory);  
    }
  };

  return (
    <div className="app">
      <div className="description">
        <h1>Welcome to online store!</h1>
        <p>Find the best products at the lowest prices!</p>
      </div>

      <div className="categories">
        <button onClick={() => handleCategorySelect('')}>All Products</button>
        <button onClick={() => handleCategorySelect('men\'s clothing')}>Men's Clothing</button>
        <button onClick={() => handleCategorySelect('women\'s clothing')}>Women's Clothing</button>
        <button onClick={() => handleCategorySelect('jewelery')}>Jewelry</button>
        <button onClick={() => handleCategorySelect('electronics')}>Electronics</button>
      </div>

      <div className="content">
        <div className="product-list-section">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          <ProductList products={filteredProducts} />
        </div>

        <div className="search-section">
          <SearchBar query={query} setQuery={handleSearch} clearSearch={clearSearch} />
        </div>
      </div>
    </div>
  );
};

export default App;
