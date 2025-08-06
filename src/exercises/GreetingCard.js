import React from 'react';

function GreetingCard({ name }) {
  return (
    <div style={{
      border: '1px solid black',
      borderRadius: '4px',
      padding: '16px',
      margin: '8px',
      backgroundColor: 'white',
      textAlign: 'center'
    }}>
      <h2>Hello, {name}! Welcome to React.</h2>
    </div>
  );
}

export default GreetingCard; 