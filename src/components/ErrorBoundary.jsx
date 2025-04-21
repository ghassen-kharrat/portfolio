import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-2xl bg-tertiary p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-lightest-gray border-b border-secondary/20 pb-4">
              Something went wrong
            </h1>
            
            <div className="mb-6">
              <p className="text-light-gray mb-4">
                The application encountered an unexpected error. Please try refreshing the page or contact me if the problem persists.
              </p>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-secondary/20 text-secondary hover:bg-secondary/30 font-mono py-2 px-4 rounded transition-colors duration-300"
              >
                Refresh Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="text-left">
                <h2 className="text-lg font-bold mb-2 text-secondary">Error Details:</h2>
                <div className="bg-primary/50 p-4 rounded overflow-auto max-h-96 text-sm font-mono mb-4">
                  <p className="text-lightest-gray">{this.state.error?.toString()}</p>
                  <p className="text-light-gray mt-2 whitespace-pre-wrap">
                    {this.state.errorInfo?.componentStack}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 