import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/ProductCard.css'; 

const ProductCard = ({ name, price, description, image, id }) => {

  const imageUrl = Array.isArray(image) ? image[0] : image;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">${price}</p>
      <Link to={`/items/${id}`} className="view-details">View Details</Link>
    </div>
  );
};

export default ProductCard;
