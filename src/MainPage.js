import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <h1 style={{
        color: 'black',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        React Lab 4 - BCU2025
      </h1>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        width: '300px'
      }}>
        <Link to="/exercises" style={{
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid black',
          padding: '20px',
          fontSize: '18px',
          cursor: 'pointer',
          width: '100%',
          textDecoration: 'none',
          textAlign: 'center'
        }}>
          Exercises 1-11
        </Link>
        
        <Link to="/homework" style={{
          backgroundColor: 'white',
          color: 'black',
          border: '2px solid black',
          padding: '20px',
          fontSize: '18px',
          cursor: 'pointer',
          width: '100%',
          textDecoration: 'none',
          textAlign: 'center'
        }}>
          Homework 1: E-commerce App
        </Link>

        <Link to="/" style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: '2px solid #007bff',
          padding: '20px',
          fontSize: '18px',
          cursor: 'pointer',
          width: '100%',
          textDecoration: 'none',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Homework 3: Authentication System
        </Link>
      </div>
      
      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        color: 'black'
      }}>
        <p>Select an option</p>
      </div>
    </div>
  );
}

export default MainPage;