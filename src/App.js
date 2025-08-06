import React, { useState } from 'react';
import MainPage from './MainPage';
import ExercisesApp from './exercises/ExercisesApp';
import EcommerceApp from './homework/EcommerceApp';

function App() {
  const [currentView, setCurrentView] = useState('main');

  const handleSelectExercises = () => {
    setCurrentView('exercises');
  };

  const handleSelectHomework = () => {
    setCurrentView('homework');
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'main') {
    return (
      <MainPage 
        onSelectExercises={handleSelectExercises}
        onSelectHomework={handleSelectHomework}
      />
    );
  }

  if (currentView === 'exercises') {
    return (
      <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid black' }}>
          <button
            onClick={handleBackToMain}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              cursor: 'pointer'
            }}
          >
            ← Back to Main
          </button>
        </div>
        <ExercisesApp />
      </div>
    );
  }

  if (currentView === 'homework') {
    return (
      <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid black' }}>
          <button
            onClick={handleBackToMain}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              cursor: 'pointer'
            }}
          >
            ← Back to Main
          </button>
        </div>
        <EcommerceApp />
      </div>
    );
  }

  return null;
}

export default App;