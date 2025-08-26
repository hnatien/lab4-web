import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const ProductList = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [currentPage, search, category, minPrice, maxPrice]);

  const loadCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/categories/list`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 8
      });

      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);

      const response = await axios.get(`${API_BASE_URL}/products?${params}`);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post(`${API_BASE_URL}/cart/add`, {
        productId,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Product added to cart!');
    } catch (error) {
      alert('Error adding to cart: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    loadProducts();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading products...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'black' }}>Products</h1>
      
      {/* Simple Search */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            padding: '8px 12px', 
            border: '1px solid black', 
            width: '200px',
            marginRight: '10px'
          }}
        />
        <button 
          onClick={handleSearch}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: 'black', 
            color: 'white', 
            border: '1px solid black',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </div>

      {/* Products List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {products.map(product => (
          <div key={product._id} style={{ 
            border: '1px solid black', 
            padding: '15px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: 'black' }}>
                {product.name}
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                {product.description}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '5px' }}>
                ${product.price}
              </div>
              <div style={{ fontSize: '12px', marginBottom: '10px' }}>
                Stock: {product.stock}
              </div>
              <button
                onClick={() => addToCart(product._id)}
                disabled={product.stock === 0}
                style={{
                  padding: '8px 16px',
                  backgroundColor: product.stock > 0 ? 'black' : '#ccc',
                  color: 'white',
                  border: '1px solid black',
                  cursor: product.stock > 0 ? 'pointer' : 'not-allowed'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!pagination.hasPrev}
            style={{
              margin: '0 5px',
              padding: '8px 16px',
              backgroundColor: pagination.hasPrev ? 'black' : '#ccc',
              color: 'white',
              border: 'none',
              cursor: pagination.hasPrev ? 'pointer' : 'not-allowed'
            }}
          >
            Previous
          </button>
          
          <span style={{ margin: '0 10px' }}>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!pagination.hasNext}
            style={{
              margin: '0 5px',
              padding: '8px 16px',
              backgroundColor: pagination.hasNext ? 'black' : '#ccc',
              color: 'white',
              border: 'none',
              cursor: pagination.hasNext ? 'pointer' : 'not-allowed'
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
