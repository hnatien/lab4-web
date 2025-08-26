import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components/auth/UserProfile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import AdminPanel from './components/AdminPanel';
import Chat from './components/Chat';
import MainPage from './MainPage';
import ExercisesApp from './exercises/ExercisesApp';
import EcommerceApp from './homework/EcommerceApp';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
          <Navigation />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* E-commerce Routes */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            } />
                         <Route path="/admin" element={
               <ProtectedRoute>
                 <AdminPanel />
               </ProtectedRoute>
             } />
             <Route path="/profile" element={
               <ProtectedRoute>
                 <UserProfile />
               </ProtectedRoute>
             } />
             <Route path="/chat" element={
               <ProtectedRoute>
                 <Chat />
               </ProtectedRoute>
             } />
            
            {/* Legacy Routes for Exercises and Homework */}
            <Route path="/exercises" element={
              <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid black' }}>
                  <Link to="/" style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}>
                    ← Back to Main
                  </Link>
                </div>
                <ExercisesApp />
              </div>
            } />
            <Route path="/homework" element={
              <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
                <div style={{ padding: '16px', borderBottom: '1px solid black' }}>
                  <Link to="/" style={{
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}>
                    ← Back to Main
                  </Link>
                </div>
                <EcommerceApp />
              </div>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;