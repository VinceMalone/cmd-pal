import * as React from 'react';

interface State {
  error: Error | null;
}

export interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback: React.ReactNode | ((error: Error) => React.ReactNode);
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: Readonly<State> = {
    error: null,
  };

  static getDerivedStateFromError(error: unknown): State {
    return {
      error:
        error instanceof Error
          ? error
          : typeof error === 'string'
          ? new Error(error)
          : new Error('Something went wrong...'),
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (__DEV__) {
      console.warn('ErrorBoundary:', error, errorInfo.componentStack);
    }
  }

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    return error === null
      ? children
      : typeof fallback === 'function'
      ? fallback(error)
      : fallback;
  }
}
