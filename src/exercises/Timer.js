import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '16px' }}>
      <h2>Timer: {formatTime(time)}</h2>
      
      <div style={{ marginTop: '16px' }}>
        {!isRunning ? (
          <button 
            onClick={startTimer}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              margin: '0 4px',
              cursor: 'pointer'
            }}
          >
            Start
          </button>
        ) : (
          <button 
            onClick={pauseTimer}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              margin: '0 4px',
              cursor: 'pointer'
            }}
          >
            Pause
          </button>
        )}
        
        <button 
          onClick={resetTimer}
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            padding: '8px 16px',
            margin: '0 4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer; 