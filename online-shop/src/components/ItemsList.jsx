import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  
import { fetchItems } from '../features/items/itemsSlice';  
import ProductCard from './ProductCard';
import Spinner from './Spinner';
import ErrorBox from './ErrorBox';
import '../styles/ItemsList.css';

const ItemsList = () => {
  const dispatch = useDispatch(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);
  const { list: products, loadingList, errorList } = useSelector((state) => state.items);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query); 
    }, 300);
    return () => clearTimeout(timer);  
  }, [query]);

  useEffect(() => {
    // Проверка на интернет-соединение
    if (navigator.onLine) {
      dispatch(fetchItems(debouncedQuery));  // Запрос к API, если интернет есть
    } else {
      // Используем кэшированные данные, если нет интернета
      const cachedItems = localStorage.getItem('items');
      if (cachedItems) {
        dispatch({ type: 'items/setItems', payload: JSON.parse(cachedItems) });
      }
    }
  }, [debouncedQuery, dispatch]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchParams({ q: newQuery });  
  };

  if (loadingList) return <Spinner />;
  if (errorList) return <ErrorBox message={errorList} />;  
  
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
