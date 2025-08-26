import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const AdminPanel = () => {
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stock: '',
    image: 'https://via.placeholder.com/300x300?text=Product+Image'
  });

  useEffect(() => {
    if (token && user?.role === 'admin') {
      loadData();
    }
  }, [token, user, activeTab, loadData]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      if (activeTab === 'products') {
        const response = await axios.get(`${API_BASE_URL}/products?limit=100`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(response.data.products);
      } else if (activeTab === 'orders') {
        const response = await axios.get(`${API_BASE_URL}/orders/admin/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [token, activeTab]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`${API_BASE_URL}/products/${editingProduct._id}`, productForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_BASE_URL}/products`, productForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: 'Electronics',
        stock: '',
        image: 'https://via.placeholder.com/300x300?text=Product+Image'
      });
      loadData();
    } catch (error) {
      alert('Error saving product: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image
    });
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        loadData();
      } catch (error) {
        alert('Error deleting product: ' + error.response?.data?.message || 'Unknown error');
      }
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${API_BASE_URL}/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadData();
    } catch (error) {
      alert('Error updating order status: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'processing': return '#2196f3';
      case 'shipped': return '#9c27b0';
      case 'delivered': return '#4caf50';
      case 'cancelled': return '#f44336';
      default: return '#666';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user || user.role !== 'admin') {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Access denied. Admin only.</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Panel</h1>
      
      {/* Tabs */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #ddd' }}>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'products' ? 'black' : 'white',
            color: activeTab === 'products' ? 'white' : 'black',
            border: '1px solid black',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'orders' ? 'black' : 'white',
            color: activeTab === 'orders' ? 'white' : 'black',
            border: '1px solid black',
            cursor: 'pointer'
          }}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <h2>Product Management</h2>
          
          {/* Add/Edit Product Form */}
          <div style={{ 
            border: '1px solid #ddd', 
            padding: '20px', 
            marginBottom: '30px',
            backgroundColor: 'white'
          }}>
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleProductSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div>
                  <label>Name *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
                  />
                </div>
                <div>
                  <label>Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
                  />
                </div>
                <div>
                  <label>Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Home">Home</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label>Stock *</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Description *</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    required
                    rows="3"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
                  />
                </div>
              </div>
              <div style={{ marginTop: '15px' }}>
                <button type="submit" style={{
                  padding: '10px 20px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}>
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                {editingProduct && (
                  <button type="button" onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      description: '',
                      price: '',
                      category: 'Electronics',
                      stock: '',
                      image: 'https://via.placeholder.com/300x300?text=Product+Image'
                    });
                  }} style={{
                    padding: '10px 20px',
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    cursor: 'pointer'
                  }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Products List */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {products.map(product => (
              <div key={product._id} style={{ 
                border: '1px solid #ddd', 
                padding: '15px',
                backgroundColor: 'white'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    marginBottom: '10px'
                  }}
                />
                <h3 style={{ margin: '10px 0' }}>{product.name}</h3>
                <p style={{ color: '#666', marginBottom: '10px' }}>{product.description.substring(0, 100)}...</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>${product.price}</span>
                  <span>Stock: {product.stock}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => editProduct(product)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#2196f3',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2>Order Management</h2>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {orders.map(order => (
              <div key={order._id} style={{ 
                border: '1px solid #ddd', 
                padding: '20px',
                backgroundColor: 'white'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ margin: '0' }}>Order #{order._id.slice(-8)}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      textTransform: 'uppercase'
                    }}>
                      {order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      style={{ padding: '5px', border: '1px solid #ddd' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <strong>Customer:</strong> {order.user.username} ({order.user.email})
                  </div>
                  <div>
                    <strong>Date:</strong> {formatDate(order.createdAt)}
                  </div>
                  <div>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </div>
                  <div>
                    <strong>Payment:</strong> {order.paymentMethod.replace('_', ' ')}
                  </div>
                </div>
                
                <div>
                  <strong>Items:</strong>
                  <div style={{ marginTop: '10px' }}>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        marginBottom: '5px',
                        padding: '5px',
                        backgroundColor: '#f9f9f9'
                      }}>
                        <span>{item.product.name} (Qty: {item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
