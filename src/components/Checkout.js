import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const Checkout = () => {
  const { token, user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit_card'
  });
  const [errors, setErrors] = useState({});

  const loadCart = useCallback(async () => {
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
  }, [token]);

  useEffect(() => {
    if (token) {
      loadCart();
    }
  }, [token, loadCart]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setProcessing(true);
      
      const response = await axios.post(`${API_BASE_URL}/orders/create`, {
        shippingAddress: formData,
        paymentMethod: formData.paymentMethod
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('Order placed successfully! Order ID: ' + response.data._id);
      window.location.href = '/orders';
    } catch (error) {
      alert('Error placing order: ' + error.response?.data?.message || 'Unknown error');
    } finally {
      setProcessing(false);
    }
  };

  if (!user) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Please login to checkout</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Checkout</h1>
        <p>Your cart is empty</p>
        <button onClick={() => window.location.href = '/products'} style={{
          padding: '10px 20px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Checkout</h1>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Checkout Form */}
        <div style={{ flex: 2, minWidth: '400px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ 
              border: '1px solid #ddd', 
              padding: '20px',
              backgroundColor: 'white',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: '0 0 20px 0' }}>Shipping Address</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: errors.street ? '1px solid #f44336' : '1px solid #ddd'
                  }}
                />
                {errors.street && <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.street}</span>}
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: errors.city ? '1px solid #f44336' : '1px solid #ddd'
                    }}
                  />
                  {errors.city && <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.city}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: errors.state ? '1px solid #f44336' : '1px solid #ddd'
                    }}
                  />
                  {errors.state && <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.state}</span>}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: errors.zipCode ? '1px solid #f44336' : '1px solid #ddd'
                    }}
                  />
                  {errors.zipCode && <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.zipCode}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '10px', 
                      border: errors.country ? '1px solid #f44336' : '1px solid #ddd'
                    }}
                  />
                  {errors.country && <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.country}</span>}
                </div>
              </div>
            </div>
            
            <div style={{ 
              border: '1px solid #ddd', 
              padding: '20px',
              backgroundColor: 'white',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: '0 0 20px 0' }}>Payment Method</h2>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleInputChange}
                  />
                  Credit Card
                </label>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                  />
                  PayPal
                </label>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={handleInputChange}
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={processing}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: processing ? '#ccc' : 'black',
                color: 'white',
                border: 'none',
                cursor: processing ? 'not-allowed' : 'pointer',
                fontSize: '16px'
              }}
            >
              {processing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ 
            border: '1px solid #ddd', 
            padding: '20px',
            backgroundColor: 'white',
            position: 'sticky',
            top: '20px'
          }}>
            <h2 style={{ margin: '0 0 20px 0' }}>Order Summary</h2>
            
            {cart.items.map(item => (
              <div key={item._id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid #eee'
              }}>
                <div>
                  <div>{item.product.name}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>
                    Qty: {item.quantity}
                  </div>
                </div>
                <div>${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
            
            <hr style={{ margin: '15px 0' }} />
            
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Subtotal:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
