import React, { useState } from 'react';

function BuggyComponent() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Intentionally throw an error when count reaches 3
    if (newCount === 3) {
      throw new Error('Intentional error triggered!');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '16px',
      border: '1px solid black',
      backgroundColor: 'white',
      textAlign: 'center'
    }}>
      <h3>Buggy Component</h3>
      <p>Click the button 3 times to trigger an error</p>
      <p><strong>Click count:</strong> {clickCount}</p>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          padding: '8px 16px',
          cursor: 'pointer',
          marginTop: '8px'
        }}
      >
        Click Me ({3 - clickCount} more to trigger error)
      </button>
    </div>
  );
}

export default BuggyComponent;
