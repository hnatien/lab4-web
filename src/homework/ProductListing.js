import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products, categories } from './mockData';
import { useCart } from './CartContext';

function ProductListing({ onNavigateToDetail, onNavigateToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(2000);
  const { getTotalItems } = useCart();

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const priceMatch = product.price <= priceRange;
    return categoryMatch && priceMatch;
  });

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1>Product Listing</h1>
        <button 
          onClick={onNavigateToCart}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Cart ({getTotalItems()})
        </button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: 'white', border: '1px solid black' }}>
        <h3>Filters</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div>
            <label>Category: </label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '4px 8px', border: '1px solid black' }}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Max Price: ${priceRange}</label>
            <input 
              type="range" 
              min="0" 
              max="2000" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))}
              style={{ marginLeft: '8px' }}
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '16px' 
      }}>
        {filteredProducts.map(product => (
          <div key={product.id} onClick={() => onNavigateToDetail(product.id)} style={{ cursor: 'pointer' }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ textAlign: 'center', fontSize: '1.2em', color: 'black' }}>
          No products match your filters.
        </p>
      )}
    </div>
  );
}

export default ProductListing; 