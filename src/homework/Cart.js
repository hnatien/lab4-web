import React from 'react';
import { useCart } from './CartContext';

function Cart({ onNavigateToProducts, onNavigateToCheckout }) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cart.length === 0) {
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

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h1>Shopping Cart</h1>
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

      <div style={{ marginBottom: '16px' }}>
        {cart.map(item => (
          <div key={item.id} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            border: '1px solid black',
            marginBottom: '8px',
            backgroundColor: 'white'
          }}>
            <img 
              src={item.image} 
              alt={item.name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                border: '1px solid black',
                marginRight: '16px'
              }}
            />
            <div style={{ flex: '1' }}>
              <h3>{item.name}</h3>
              <p style={{ color: 'black' }}>${item.price}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label>Quantity: </label>
              <input 
                type="number" 
                min="1" 
                value={item.quantity} 
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                style={{ width: '60px', padding: '4px', border: '1px solid black' }}
              />
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
            <div style={{ marginLeft: '16px', textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid black',
        paddingTop: '16px',
        textAlign: 'right'
      }}>
        <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
        <div style={{ marginTop: '16px' }}>
          <button 
            onClick={clearCart}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            Clear Cart
          </button>
          <button 
            onClick={onNavigateToCheckout}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              cursor: 'pointer'
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart; 