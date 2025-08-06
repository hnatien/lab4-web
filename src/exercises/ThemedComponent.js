import React from 'react';
import { useTheme } from './ThemeContext';

function ThemedComponent() {
  const { theme } = useTheme();

  const themeStyles = {
    light: {
      background: 'white',
      color: 'black',
      border: '1px solid black',
      padding: '16px',
      margin: '8px 0'
    },
    dark: {
      background: 'black',
      color: 'white',
      border: '1px solid black',
      padding: '16px',
      margin: '8px 0'
    }
  };

  return (
    <div style={themeStyles[theme]}>
      <h3>Current Theme: {theme}</h3>
      <p>This component adapts to the current theme using Context API.</p>
      <p>The background and text colors change based on the selected theme.</p>
    </div>
  );
}

export default ThemedComponent; 