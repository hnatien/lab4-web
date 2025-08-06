import React, { useState } from 'react';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function SimpleNavigation() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ border: '1px solid black', padding: '16px', backgroundColor: 'white' }}>
      <nav style={{ marginBottom: '16px' }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '16px' }}>
          <li>
            <button 
              onClick={() => setCurrentPage('home')}
              style={{
                backgroundColor: currentPage === 'home' ? 'black' : 'white',
                color: currentPage === 'home' ? 'white' : 'black',
                border: '1px solid black',
                padding: '8px 16px',
                cursor: 'pointer'
              }}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('about')}
              style={{
                backgroundColor: currentPage === 'about' ? 'black' : 'white',
                color: currentPage === 'about' ? 'white' : 'black',
                border: '1px solid black',
                padding: '8px 16px',
                cursor: 'pointer'
              }}
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => setCurrentPage('contact')}
              style={{
                backgroundColor: currentPage === 'contact' ? 'black' : 'white',
                color: currentPage === 'contact' ? 'white' : 'black',
                border: '1px solid black',
                padding: '8px 16px',
                cursor: 'pointer'
              }}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>

      {renderCurrentPage()}
    </div>
  );
}

export default SimpleNavigation; 