import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { login, error: authError, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, [clearError]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username or email is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

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

        setIsSubmitting(true);
        
        try {
            const result = await login(formData.username, formData.password);
            if (result.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid black',
            backgroundColor: 'white'
        }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '30px',
                color: 'black'
            }}>
                Login
            </h2>

            {authError && (
                <div style={{
                    padding: '10px',
                    marginBottom: '20px',
                    backgroundColor: '#f8f8f8',
                    color: 'black',
                    border: '1px solid black',
                    fontSize: '14px'
                }}>
                    {authError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: 'black'
                    }}>
                        Username or Email
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: `1px solid ${errors.username ? 'black' : '#ccc'}`,
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Enter username or email"
                    />
                    {errors.username && (
                        <div style={{
                            color: 'black',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}>
                            {errors.username}
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: 'black'
                    }}>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: `1px solid ${errors.password ? 'black' : '#ccc'}`,
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Enter password"
                    />
                    {errors.password && (
                        <div style={{
                            color: 'black',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}>
                            {errors.password}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'black',
                        color: 'white',
                        border: '1px solid black',
                        fontSize: '16px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1
                    }}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div style={{
                textAlign: 'center',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid #ccc'
            }}>
                <p style={{ color: '#666', margin: 0 }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{
                        color: 'black',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}>
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
