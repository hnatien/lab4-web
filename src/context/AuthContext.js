import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Set up axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Check authentication status on app startup
    useEffect(() => {
        const checkAuthStatus = async () => {
            if (token) {
                try {
                    const response = await axios.get(`${API_BASE_URL}/auth/profile`);
                    setUser(response.data.data);
                } catch (error) {
                    console.error('Auth check failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuthStatus();
    }, [token]);

    const login = async (username, password) => {
        try {
            setError('');
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                username,
                password
            });

            const { token: newToken, user: userData } = response.data.data;
            
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const register = async (username, email, password) => {
        try {
            setError('');
            const response = await axios.post(`${API_BASE_URL}/auth/register`, {
                username,
                email,
                password
            });

            const { token: newToken, user: userData } = response.data.data;
            
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
        setError('');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    const clearError = () => {
        setError('');
    };

    const value = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
