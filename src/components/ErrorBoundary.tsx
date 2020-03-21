import * as React from 'react';

interface State {
  error: Error | null;
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback: React.ReactNode | ((error: Error) => React.ReactNode);
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state = {
    error: null,
    hasError: false,
  };

  static getDerivedStateFromError(error: unknown): State {
    return {
      error: error as Error, // TODO: see below (about ensure type `Error`)
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: probably not in a production build?
    console.warn('ErrorBoundary:', error, errorInfo.componentStack);
  }

  render() {
    const { children, fallback } = this.props;
    const { error, hasError } = this.state;

    return hasError
      ? typeof fallback === 'function'
        ? fallback(error!) // TODO: this is guaranteed to be an `Error` -- ensure this somehow
        : fallback
      : children;
  }
}
