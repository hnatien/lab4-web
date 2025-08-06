import React from 'react';
import HelloWorld from './HelloWorld';
import GreetingCard from './GreetingCard';
import Counter from './Counter';
import ToggleVisibility from './ToggleVisibility';
import TodoList from './TodoList';
import DynamicListFiltering from './DynamicListFiltering';
import Timer from './Timer';
import UserProfile from './UserProfile';
import SimpleNavigation from './SimpleNavigation';
import LoginForm from './LoginForm';
import ThemeSwitcher from './ThemeSwitcher';

function ExercisesApp() {
  return (
    <div style={{ padding: '16px' }}>
      <h1>React Exercises 1-11</h1>
      
      <h2>Exercise 1: Hello World Component</h2>
      <HelloWorld />
      
      <h2>Exercise 2: Greeting Card Component</h2>
      <GreetingCard name="Thai" />
      <GreetingCard name="Tien" />
      
      <h2>Exercise 3: Counter Application</h2>
      <Counter />
      
      <h2>Exercise 4: Toggle Visibility Component</h2>
      <ToggleVisibility />
      
      <h2>Exercise 5: Basic Todo List</h2>
      <TodoList />
      
      <h2>Exercise 6: Dynamic List Filtering</h2>
      <DynamicListFiltering />
      
      <h2>Exercise 7: Timer/Stopwatch Component</h2>
      <Timer />
      
      <h2>Exercise 8: Data Fetching Component</h2>
      <UserProfile />
      
      <h2>Exercise 9: Simple Navigation with React Router</h2>
      <SimpleNavigation />
      
      <h2>Exercise 10: Login Form with Validation</h2>
      <LoginForm />
      
      <h2>Exercise 11: Theme Switcher with Context API</h2>
      <ThemeSwitcher />
    </div>
  );
}

export default ExercisesApp; 