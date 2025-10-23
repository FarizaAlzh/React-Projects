import React from 'react';
import '../styles/ProductCard.css';  

const ProductCard = ({ name, price, description, image }) => {
  return (
    <div className="product-card">
      <img 
        src={image} 
        alt={name} 
        className="product-image" 
      />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">${price}</p>
    </div>
  );
};

export default ProductCard;
