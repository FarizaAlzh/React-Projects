import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  
import { fetchItemById } from '../features/items/itemsSlice';  
import Spinner from './Spinner';
import ErrorBox from './ErrorBox';
import '../styles/ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  
  const { selectedItem, loadingItem, errorItem } = useSelector((state) => state.items);

  useEffect(() => {
    
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  if (loadingItem) return <Spinner />;
  if (errorItem) return <ErrorBox message={errorItem} />;
  if (!selectedItem) return <ErrorBox message="Product not found" />;

  const { title, images, description, category, price, rating, brand } = selectedItem;
  const imageUrl = images[0];  

  return (
    <div className="product-details">
      <h1>{title}</h1>
      <img src={imageUrl} alt={title} className="product-image" />
      <div className="product-info">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Rating:</strong> {rating}</p>
        <p><strong>Brand:</strong> {brand}</p>
        <p>{description}</p>
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ItemDetails;
