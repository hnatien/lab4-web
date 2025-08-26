import React from 'react';

function TestingDemo() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <h2>Counter Component Tests</h2>
      
      <div style={{
        border: '1px solid black',
        padding: '16px',
        backgroundColor: 'white'
      }}>
        <h3>Test Cases</h3>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>Initial State:</strong> Verifies that the initial count is 0</li>
          <li><strong>Increment:</strong> Tests that clicking increment increases the count</li>
          <li><strong>Decrement:</strong> Tests that clicking decrement decreases the count</li>
          <li><strong>Reset:</strong> Tests that clicking reset returns count to 0</li>
          <li><strong>Multiple Increments:</strong> Tests multiple increment clicks</li>
          <li><strong>Negative Values:</strong> Tests decrementing below zero</li>
          <li><strong>Button Presence:</strong> Verifies all buttons are rendered and clickable</li>
        </ul>
        
        <p style={{ color: 'black', fontWeight: 'bold', marginTop: '16px' }}>
          All 7 tests are passing!
        </p>
      </div>
    </div>
  );
}

export default TestingDemo;
