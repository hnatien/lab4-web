import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const ShoppingCart = () => {
  const { token, user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadCart();
    }
  }, [token]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/cart/update/${itemId}`, {
        quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      alert('Error updating quantity: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cart/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      alert('Error removing item: ' + error.response?.data?.message || 'Unknown error');
    }
  };

  const clearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/cart/clear`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(response.data);
      } catch (error) {
        alert('Error clearing cart: ' + error.response?.data?.message || 'Unknown error');
      }
    }
  };

  if (!user) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Please login to view your cart</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: 'black' }}>Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: 'black' }}>Cart</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        {cart.items.map(item => (
          <div key={item._id} style={{ 
            border: '1px solid black', 
            padding: '15px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: 'black' }}>
                {item.product.name}
              </h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                ${item.product.price} each
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                style={{ padding: '5px', border: '1px solid black' }}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              
              <span style={{ fontWeight: 'bold', minWidth: '60px' }}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
              
              <button
                onClick={() => removeItem(item._id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        border: '1px solid black', 
        padding: '20px',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: 'black' }}>Total: ${cart.total.toFixed(2)}</h2>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={clearCart}
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              cursor: 'pointer'
            }}
          >
            Clear Cart
          </button>
          
          <button
            onClick={() => window.location.href = '/checkout'}
            style={{
              padding: '10px 20px',
              backgroundColor: 'black',
              color: 'white',
              border: '1px solid black',
              cursor: 'pointer'
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
