import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register, error: authError, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        clearError();
    }, [clearError]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        } else if (formData.username.length > 30) {
            newErrors.username = 'Username cannot be more than 30 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            const result = await register(formData.username, formData.email, formData.password);
            if (result.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Registration error:', error);
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
                Register
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
                        Username
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
                        placeholder="Enter username (3-30 characters)"
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
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: `1px solid ${errors.email ? 'black' : '#ccc'}`,
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Enter email address"
                    />
                    {errors.email && (
                        <div style={{
                            color: 'black',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}>
                            {errors.email}
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
                        placeholder="Enter password (min 6 characters)"
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

                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        fontWeight: 'bold',
                        color: 'black'
                    }}>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: `1px solid ${errors.confirmPassword ? 'black' : '#ccc'}`,
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                        <div style={{
                            color: 'black',
                            fontSize: '12px',
                            marginTop: '5px'
                        }}>
                            {errors.confirmPassword}
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
                    {isSubmitting ? 'Creating account...' : 'Register'}
                </button>
            </form>

            <div style={{
                textAlign: 'center',
                marginTop: '20px',
                paddingTop: '20px',
                borderTop: '1px solid #ccc'
            }}>
                <p style={{ color: '#666', margin: 0 }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{
                        color: 'black',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}>
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
