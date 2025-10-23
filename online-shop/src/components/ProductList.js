import React from 'react';
import ProductCard from './ProductCard';  
import '../styles/ProductList.css';    

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-list-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
