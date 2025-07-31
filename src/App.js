import React from 'react';
import HelloWorld from './HelloWorld';
import GreetingCard from './GreetingCard';
import Counter from './Counter';
import ToggleVisibility from './ToggleVisibility';
import TodoList from './TodoList';

function App() {
  return (
    <div>
      <HelloWorld />
      <GreetingCard name="Thai" />
      <GreetingCard name="Tien" />
      <Counter />
      <ToggleVisibility />
      <TodoList />
    </div>
  );
}

export default App;
