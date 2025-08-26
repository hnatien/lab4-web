import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinkStyle = (active) => ({
        padding: '8px 12px',
        textDecoration: 'none',
        color: active ? 'black' : '#666',
        fontWeight: active ? 'bold' : 'normal',
        border: active ? '1px solid black' : '1px solid transparent'
    });

    return (
        <nav style={{
            backgroundColor: 'white',
            borderBottom: '1px solid black',
            padding: '0 20px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                height: '60px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        marginRight: '30px'
                    }}>
                        Lab 4 + 5
                    </Link>

                                         <div style={{
                         display: 'flex',
                         gap: '10px'
                     }}>
                         <Link to="/products" style={navLinkStyle(isActive('/products'))}>
                             Products
                         </Link>
                         {isAuthenticated && (
                             <>
                                 <Link to="/cart" style={navLinkStyle(isActive('/cart'))}>
                                     Cart
                                 </Link>
                                 <Link to="/orders" style={navLinkStyle(isActive('/orders'))}>
                                     Orders
                                 </Link>
                                 {user?.role === 'admin' && (
                                     <Link to="/admin" style={navLinkStyle(isActive('/admin'))}>
                                         Admin
                                     </Link>
                                 )}
                                 <Link to="/profile" style={navLinkStyle(isActive('/profile'))}>
                                     Profile
                                 </Link>
                             </>
                         )}
                         <Link to="/exercises" style={navLinkStyle(isActive('/exercises'))}>
                             Exercises
                         </Link>
                                                   <Link to="/homework" style={navLinkStyle(isActive('/homework'))}>
                              Homework
                          </Link>
                          <Link to="/chat" style={navLinkStyle(isActive('/chat'))}>
                              Chat
                          </Link>
                     </div>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    {isAuthenticated ? (
                        <>
                            <span style={{
                                color: '#666',
                                fontSize: '14px'
                            }}>
                                Welcome, {user?.username}!
                            </span>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: 'white',
                                    color: 'black',
                                    border: '1px solid black',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div style={{
                            display: 'flex',
                            gap: '10px'
                        }}>
                            <Link to="/login" style={navLinkStyle(isActive('/login'))}>
                                Login
                            </Link>
                            <Link to="/register" style={navLinkStyle(isActive('/register'))}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
