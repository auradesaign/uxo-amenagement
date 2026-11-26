import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Application render error:', error, info);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="min-h-screen bg-[#FAF8F5] text-[#1E1D1B] flex items-center justify-center p-6"
        >
          <div className="max-w-md w-full bg-white border border-[#E3DAD0] rounded-2xl p-8 text-center space-y-5">
            <h1 className="text-2xl font-semibold">حدث خطأ غير متوقع</h1>
            <p className="text-sm text-[#5E574F] leading-relaxed">
              نعتذر عن هذا الخلل المؤقت. يمكنك إعادة تحميل الصفحة للمتابعة واستكمال طلبك.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#1E1D1B] text-[#FAF8F5] text-sm font-medium hover:bg-[#32302C] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1D1B]"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
