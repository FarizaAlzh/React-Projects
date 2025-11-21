import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getItems } from '../services/ProductService';  
import ProductCard from './ProductCard';
import Spinner from './Spinner';
import ErrorBox from './ErrorBox';
import '../styles/ItemsList.css';

const ItemsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getItems(debouncedQuery); 
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [debouncedQuery]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchParams({ q: newQuery });
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for products"
          className="search-input"
        />
      </div>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.title}
              price={product.price}
              description={product.description}
              image={product.images}
              id={product.id} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ItemsList;
