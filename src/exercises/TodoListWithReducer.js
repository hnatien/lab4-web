import React, { useReducer, useState } from 'react';

// Initial state
const initialState = {
  todos: [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Master JavaScript', completed: false }
  ]
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    default:
      return state;
  }
}

function TodoListWithReducer() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const removeTodo = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
      <h2>Todo List (useReducer)</h2>
      
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
        {state.todos.map((todo) => (
          <li key={todo.id} style={{
            padding: '8px',
            margin: '4px 0',
            backgroundColor: 'white',
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '8px' }}
              />
              <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'gray' : 'black'
              }}>
                {todo.text}
              </span>
            </div>
                         <button
               onClick={() => removeTodo(todo.id)}
               style={{
                 backgroundColor: 'white',
                 color: 'black',
                 border: '1px solid black',
                 padding: '4px 8px',
                 cursor: 'pointer',
                 fontSize: '12px'
               }}
             >
               Remove
             </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoListWithReducer;
