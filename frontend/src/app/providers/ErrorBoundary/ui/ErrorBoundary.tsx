import { Component, PropsWithChildren } from 'react';
import { ErrorFallback } from 'widgets/ErrorFallback';

export class ErrorBoundary extends Component<PropsWithChildren> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
