import React from 'react';
import { products } from './mockData';
import { useCart } from './CartContext';

function ProductDetail({ productId, onNavigateBack }) {
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button 
          onClick={onNavigateBack}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={onNavigateBack}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          padding: '8px 16px',
          cursor: 'pointer',
          marginBottom: '16px'
        }}
      >
        ← Back to Products
      </button>
      
      <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
        <div style={{ flex: '1' }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{
              width: '100%',
              maxWidth: '400px',
              border: '1px solid black'
            }}
          />
        </div>
        
        <div style={{ flex: '1' }}>
          <h1>{product.name}</h1>
          <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'black' }}>
            ${product.price}
          </p>
          <p style={{ color: 'black', marginBottom: '16px' }}>
            Category: {product.category}
          </p>
          <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
            {product.description}
          </p>
          <button 
            onClick={() => addToCart(product)}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '1.1em'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 