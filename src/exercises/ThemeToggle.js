import React from 'react';
import { useTheme } from './ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white',
        padding: '8px 16px',
        cursor: 'pointer',
        border: '1px solid black'
      }}
    >
      Toggle Theme ({theme})
    </button>
  );
}

export default ThemeToggle; 