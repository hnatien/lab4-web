import React, { useState } from 'react';

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <button 
        onClick={toggleVisibility}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          padding: '8px 16px',
          cursor: 'pointer',
          marginBottom: '8px'
        }}
      >
        {isVisible ? 'Hide' : 'Show'} Content
      </button>
      
      {isVisible && (
        <div style={{
          backgroundColor: 'white',
          padding: '16px',
          border: '1px solid black'
        }}>
          <h3>This content can be toggled!</h3>
          <p>Click the button above to show or hide this content.</p>
        </div>
      )}
    </div>
  );
}

export default ToggleVisibility; 