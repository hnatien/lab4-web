import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';

const OrderHistory = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token, loadOrders]);

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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Please login to view your orders</div>;
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading orders...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Order History</h1>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>No orders found</p>
          <button onClick={() => window.location.href = '/products'} style={{
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* Orders List */}
          <div style={{ flex: 2, minWidth: '400px' }}>
            {orders.map(order => (
              <div key={order._id} style={{ 
                border: '1px solid #ddd', 
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                boxShadow: selectedOrder?._id === order._id ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}
              onClick={() => setSelectedOrder(order)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ margin: '0' }}>Order #{order._id.slice(-8)}</h3>
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
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Date:</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Items:</span>
                  <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            {selectedOrder ? (
              <div style={{ 
                border: '1px solid #ddd', 
                padding: '20px',
                backgroundColor: 'white',
                position: 'sticky',
                top: '20px'
              }}>
                <h2 style={{ margin: '0 0 20px 0' }}>Order Details</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>Order Information</h3>
                  <div style={{ marginBottom: '5px' }}>
                    <strong>Order ID:</strong> {selectedOrder._id.slice(-8)}
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    <strong>Status:</strong> 
                    <span style={{ 
                      backgroundColor: getStatusColor(selectedOrder.status),
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      marginLeft: '10px',
                      textTransform: 'uppercase'
                    }}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    <strong>Payment Method:</strong> {selectedOrder.paymentMethod.replace('_', ' ')}
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    <strong>Payment Status:</strong> {selectedOrder.paymentStatus}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>Shipping Address</h3>
                  <div>
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}<br />
                    {selectedOrder.shippingAddress.country}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>Items</h3>
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      gap: '10px', 
                      marginBottom: '10px',
                      paddingBottom: '10px',
                      borderBottom: '1px solid #eee'
                    }}>
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold' }}>{item.product.name}</div>
                        <div style={{ color: '#666', fontSize: '12px' }}>
                          Qty: {item.quantity} × ${item.price}
                        </div>
                        {item.variant && (item.variant.size || item.variant.color) && (
                          <div style={{ color: '#666', fontSize: '12px' }}>
                            {item.variant.size && `Size: ${item.variant.size}`}
                            {item.variant.size && item.variant.color && ' | '}
                            {item.variant.color && `Color: ${item.variant.color}`}
                          </div>
                        )}
                      </div>
                      <div style={{ fontWeight: 'bold' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  borderTop: '2px solid #ddd', 
                  paddingTop: '15px',
                  textAlign: 'right'
                }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Total: ${selectedOrder.total.toFixed(2)}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ 
                border: '1px solid #ddd', 
                padding: '20px',
                backgroundColor: 'white',
                textAlign: 'center',
                color: '#666'
              }}>
                Select an order to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
