import React, { useState } from 'react';
import { CartProvider } from './CartContext';
import ProductListing from './ProductListing';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout';

function EcommerceApp() {
  const [currentView, setCurrentView] = useState('products');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigateToProducts = () => setCurrentView('products');
  const navigateToProductDetail = (id) => {
    setSelectedProductId(id);
    setCurrentView('productDetail');
  };
  const navigateToCart = () => setCurrentView('cart');
  const navigateToCheckout = () => setCurrentView('checkout');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'products':
        return <ProductListing onNavigateToDetail={navigateToProductDetail} onNavigateToCart={navigateToCart} />;
      case 'productDetail':
        return <ProductDetail productId={selectedProductId} onNavigateBack={navigateToProducts} />;
      case 'cart':
        return <Cart onNavigateToProducts={navigateToProducts} onNavigateToCheckout={navigateToCheckout} />;
      case 'checkout':
        return <Checkout onNavigateToProducts={navigateToProducts} onNavigateToCart={navigateToCart} />;
      default:
        return <ProductListing onNavigateToDetail={navigateToProductDetail} onNavigateToCart={navigateToCart} />;
    }
  };

  return (
    <CartProvider>
      <div style={{ padding: '16px' }}>
        <h1>Simple E-commerce Product Listing</h1>
        {renderCurrentView()}
      </div>
    </CartProvider>
  );
}

export default EcommerceApp; 