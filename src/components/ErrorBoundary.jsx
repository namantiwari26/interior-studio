import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full py-16 px-4 text-center bg-[#FAF6EF] rounded-2xl border border-[rgba(60,45,30,0.12)] my-6">
          <p className="text-sm font-serif text-[#1C140D]">Interactive 3D view temporarily unavailable on this device.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-3 px-4 py-1.5 text-xs rounded-full bg-[#241A12] text-[#FAF6EF]"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
