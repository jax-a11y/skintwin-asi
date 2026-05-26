import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './components/dashboard/Dashboard';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';

// Main App component
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Dashboard width={window.innerWidth} height={window.innerHeight} />
    </ThemeProvider>
  );
};

// Render the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
