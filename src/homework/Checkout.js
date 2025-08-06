import React, { useState } from 'react';
import { useCart } from './CartContext';

function Checkout({ onNavigateToProducts, onNavigateToCart }) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <button 
          onClick={onNavigateToProducts}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
        <button 
          onClick={onNavigateToProducts}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Checkout</h1>
      
      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Order Summary */}
        <div style={{ flex: '1' }}>
          <h2>Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid black',
              marginBottom: '8px',
              backgroundColor: 'white'
            }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  border: '1px solid black',
                  marginRight: '12px'
                }}
              />
              <div style={{ flex: '1' }}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
              </div>
              <p style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          
          <div style={{
            borderTop: '1px solid black',
            paddingTop: '16px',
            marginTop: '16px'
          }}>
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{ flex: '1' }}>
          <h2>Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label>Full Name: </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid black' }}
              />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid black' }}
              />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label>Address: </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid black' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ flex: '1' }}>
                <label>City: </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid black' }}
                />
              </div>
              <div style={{ flex: '1' }}>
                <label>ZIP Code: </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', marginTop: '4px', border: '1px solid black' }}
                />
              </div>
            </div>
            
            <div style={{ marginTop: '16px' }}>
              <button 
                type="button" 
                onClick={onNavigateToCart}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  marginRight: '12px'
                }}
              >
                Back to Cart
              </button>
              <button type="submit" style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid black',
                padding: '8px 16px',
                cursor: 'pointer'
              }}>
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout; 