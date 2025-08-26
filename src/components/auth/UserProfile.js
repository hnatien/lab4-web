import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '50px',
                color: '#666'
            }}>
                No user data available
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '600px',
            margin: '50px auto',
            padding: '30px',
            border: '1px solid black',
            backgroundColor: 'white'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '1px solid #ccc'
            }}>
                <h2 style={{
                    margin: 0,
                    color: 'black'
                }}>
                    User Profile
                </h2>
                <button
                    onClick={logout}
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
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '14px'
                }}>
                    Username
                </label>
                <div style={{
                    padding: '12px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    color: 'black'
                }}>
                    {user.username}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '14px'
                }}>
                    Email
                </label>
                <div style={{
                    padding: '12px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    color: 'black'
                }}>
                    {user.email}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '14px'
                }}>
                    User ID
                </label>
                <div style={{
                    padding: '12px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    color: '#666',
                    fontFamily: 'monospace'
                }}>
                    {user._id}
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '14px'
                }}>
                    Account Created
                </label>
                <div style={{
                    padding: '12px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    color: 'black'
                }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
