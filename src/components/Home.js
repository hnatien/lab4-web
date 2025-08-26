import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'white',
            padding: '40px 20px'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    color: 'black',
                    marginBottom: '20px'
                }}>
                    Lab 4 + 5: Web Development
                </h1>

                
                {isAuthenticated ? (
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Link to="/products" style={{
                            padding: '12px 24px',
                            backgroundColor: 'black',
                            color: 'white',
                            textDecoration: 'none',
                            border: '1px solid black'
                        }}>
                            Browse Products
                        </Link>
                        <Link to="/cart" style={{
                            padding: '12px 24px',
                            backgroundColor: 'white',
                            color: 'black',
                            textDecoration: 'none',
                            border: '1px solid black'
                        }}>
                            View Cart
                        </Link>
                        <Link to="/orders" style={{
                            padding: '12px 24px',
                            backgroundColor: 'white',
                            color: 'black',
                            textDecoration: 'none',
                            border: '1px solid black'
                        }}>
                            My Orders
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Link to="/register" style={{
                            padding: '12px 24px',
                            backgroundColor: 'black',
                            color: 'white',
                            textDecoration: 'none',
                            border: '1px solid black'
                        }}>
                            Register
                        </Link>
                        <Link to="/login" style={{
                            padding: '12px 24px',
                            backgroundColor: 'white',
                            color: 'black',
                            textDecoration: 'none',
                            border: '1px solid black'
                        }}>
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
