import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '16px',
          border: '1px solid black',
          backgroundColor: 'white',
          textAlign: 'center'
        }}>
          <h3>Something went wrong!</h3>
          <p>An error occurred in one of the child components.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
              padding: '8px 16px',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    // Render children normally if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
