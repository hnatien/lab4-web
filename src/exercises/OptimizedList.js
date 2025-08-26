import React, { useState, useCallback } from 'react';
import ListItem from './ListItem';

function OptimizedList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' }
  ]);
  
  const [counter, setCounter] = useState(0);

  // Memoized callback function using useCallback
  const handleDeleteItem = useCallback((id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const addItem = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems(prevItems => [...prevItems, { id: newId, text: `Item ${newId}` }]);
  };

  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <h2>Optimized List (React.memo + useCallback)</h2>
      
      <div style={{ marginBottom: '16px' }}>
        <p><strong>Parent Counter:</strong> {counter}</p>
        <button 
          onClick={incrementCounter}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            marginRight: '8px',
            cursor: 'pointer'
          }}
        >
          Increment Counter
        </button>
        <button 
          onClick={addItem}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Add Item
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '12px', color: 'gray' }}>
          Check console to see when ListItem components re-render
        </p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            text={item.text}
            onDelete={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default OptimizedList;
