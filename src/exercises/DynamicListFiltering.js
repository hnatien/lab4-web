import React, { useState } from 'react';

function DynamicListFiltering() {
  const [todos, setTodos] = useState([
    'Learn React',
    'Build a todo app',
    'Master JavaScript',
    'Study React Hooks',
    'Practice coding'
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodo, setNewTodo] = useState('');

  const filteredTodos = todos.filter(todo =>
    todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '16px' }}>
      <h2>Dynamic List Filtering</h2>
      
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid black',
            marginBottom: '8px'
          }}
        />
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Add new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            style={{
              flex: '1',
              padding: '8px',
              border: '1px solid black'
            }}
          />
          <button 
            onClick={addTodo}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              cursor: 'pointer'
            }}
          >
            Add
          </button>
        </div>
      </div>

      <div>
        <h3>Filtered Todos:</h3>
        {filteredTodos.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredTodos.map((todo, index) => (
              <li key={index} style={{
                padding: '8px',
                margin: '4px 0',
                backgroundColor: 'white',
                border: '1px solid black'
              }}>
                {todo}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'black', fontStyle: 'italic' }}>
            No todos match your search term.
          </p>
        )}
      </div>
    </div>
  );
}

export default DynamicListFiltering; 