import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <h2>Counter: {count}</h2>
      <div style={{ marginTop: '8px' }}>
        <button 
          onClick={increment}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            margin: '0 4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
        <button 
          onClick={decrement}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            margin: '0 4px',
            cursor: 'pointer'
          }}
        >
          Decrement
        </button>
        <button 
          onClick={reset}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            margin: '0 4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter; 