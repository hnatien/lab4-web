import React from 'react';

function MainPage({ onSelectExercises, onSelectHomework }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <h1 style={{
        color: 'black',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        React Lab 4 - BCU2025
      </h1>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        width: '300px'
      }}>
        <button
          onClick={onSelectExercises}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black',
            padding: '20px',
            fontSize: '18px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Exercises 1-11
        </button>
        
        <button
          onClick={onSelectHomework}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black',
            padding: '20px',
            fontSize: '18px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Homework 1: E-commerce App
        </button>
      </div>
      
      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        color: 'black'
      }}>
        <p>Select an option</p>
      </div>
    </div>
  );
}

export default MainPage;