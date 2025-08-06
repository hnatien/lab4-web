import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';
import ThemedComponent from './ThemedComponent';

function ThemeSwitcher() {
  return (
    <ThemeProvider>
      <div>
        <h2>Theme Switcher with Context API</h2>
        <ThemeToggle />
        <ThemedComponent />
        <ThemedComponent />
      </div>
    </ThemeProvider>
  );
}

export default ThemeSwitcher; 