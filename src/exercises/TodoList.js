import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(['Learn React', 'Build a todo app', 'Master JavaScript']);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <h2>Todo List</h2>
      
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          style={{
            width: '70%',
            padding: '8px',
            marginRight: '8px',
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

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
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
    </div>
  );
}

export default TodoList; 