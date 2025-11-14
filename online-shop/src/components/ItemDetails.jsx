import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/ProductService'; 
import Spinner from './Spinner'; 
import ErrorBox from './ErrorBox'; 
import '../styles/ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true); 
        const fetchedProduct = await fetchProductById(id); 
        setProduct(fetchedProduct);
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке товара');
      } finally {
        setLoading(false); 
      }
    };
    loadProduct();
  }, [id]); 


  if (loading) return <Spinner />;
  

  if (error) return <ErrorBox message={error} />;
  

  if (!product) return <ErrorBox message="Product not found" />;


  const { name, images, description, category, price, rating } = product;


  const imageUrl = images[0];

  return (
    <div>
      <h1>{name}</h1>
      <img src={imageUrl} alt={name} className="product-image" /> 
      <p>{description}</p> 
      <p><strong>Category:</strong> {category}</p> 
      <p><strong>Price:</strong> ${price}</p> 
      <p><strong>Rating:</strong> {rating}</p> 
      
      <button onClick={() => navigate(-1)}>Back</button> 
    </div>
  );
};

export default ItemDetails;
