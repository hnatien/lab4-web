import React from 'react';
import { useCart } from './CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={{
      border: '1px solid black',
      padding: '16px',
      margin: '8px',
      width: '250px',
      textAlign: 'center',
      backgroundColor: 'white'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          border: '1px solid black'
        }}
      />
      <h3>{product.name}</h3>
      <p style={{ color: 'black' }}>{product.description}</p>
      <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'black' }}>
        ${product.price}
      </p>
      <button 
        onClick={() => addToCart(product)}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          padding: '8px 16px',
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard; 