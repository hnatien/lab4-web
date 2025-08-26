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
import DataLoader from './DataLoader';
import TodoListWithReducer from './TodoListWithReducer';
import OptimizedList from './OptimizedList';
import ErrorBoundary from './ErrorBoundary';
import BuggyComponent from './BuggyComponent';
import ModalDemo from './ModalDemo';
import TestingDemo from './TestingDemo';
import FormTestingDemo from './FormTestingDemo';

function ExercisesApp() {
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Section 1: React Fundamentals */}
      <div style={{ marginBottom: '40px' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 1: Hello World Component
          </h3>
          <HelloWorld />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 2: Greeting Card Component
          </h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <GreetingCard name="Alice" />
            <GreetingCard name="Bob" />
            <GreetingCard name="Charlie" />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 3: Counter Application
          </h3>

          <Counter />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 4: Toggle Visibility Component
          </h3>

          <ToggleVisibility />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 5: Basic Todo List
          </h3>

          <TodoList />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 6: Dynamic List Filtering
          </h3>

          <DynamicListFiltering />
        </div>
      </div>

      {/* Section 2: React Hooks */}
      <div style={{ marginBottom: '40px' }}>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 7: Timer/Stopwatch Component
          </h3>

          <Timer />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 8: Data Fetching Component
          </h3>

          <UserProfile />
        </div>
      </div>

      {/* Section 3: React Router and Forms */}
      <div style={{ marginBottom: '40px' }}>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 9: Simple Navigation with React Router
          </h3>

          <SimpleNavigation />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 10: Login Form with Validation
          </h3>

          <LoginForm />
        </div>
      </div>

      {/* Section 4: Context API */}
      <div style={{ marginBottom: '40px' }}>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 11: Theme Switcher with Context API
          </h3>

          <ThemeSwitcher />
        </div>
      </div>

      {/* Additional Advanced Exercises */}
      <div style={{ marginBottom: '40px' }}>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 13: Render Props for Data Fetching
          </h3>

          <DataLoader 
            render={({ data, loading, error }) => {
              if (loading) {
                return <div>Loading data...</div>;
              }
              
              if (error) {
                return <div>Error: {error}</div>;
              }
              
              return (
                <div style={{ maxWidth: '400px', margin: '0 auto', padding: '16px' }}>
                  <h3>Post Data</h3>
                  {data && (
                    <div style={{
                      border: '1px solid black',
                      padding: '16px',
                      backgroundColor: 'white'
                    }}>
                      <h4>{data.title}</h4>
                      <p><strong>ID:</strong> {data.id}</p>
                      <p><strong>User ID:</strong> {data.userId}</p>
                      <p><strong>Body:</strong> {data.body}</p>
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 14: Complex State Management with useReducer
          </h3>

          <TodoListWithReducer />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 15: Optimizing a List with React.memo and useCallback
          </h3>

          <OptimizedList />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 16: Implementing an Error Boundary
          </h3>

          <ErrorBoundary>
            <BuggyComponent />
          </ErrorBoundary>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 17: Modal with Portals
          </h3>

          <ModalDemo />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 18: Testing a Simple Component
          </h3>

          <TestingDemo />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#34495e', marginBottom: '15px' }}>
            Exercise 19: Testing a Form Component
          </h3>

          <FormTestingDemo />
        </div>
      </div>
    </div>
  );
}

export default ExercisesApp; 