import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[GCC Atlas Uncaught Error]:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-rose-200 rounded-lg p-6 shadow-md text-center space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-full flex items-center justify-center mx-auto">
              <AlertOctagon size={28} />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 font-semibold block">
                Application State Recovery
              </span>
              <h3 className="text-xl font-editorial font-bold text-stone-900 mt-1">
                Unable to render data view
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              An unexpected state error occurred while rendering the registry. Our zero-blackbox neutrality guarantee logs error telemetry for audit.
            </p>
            {this.state.error && (
              <pre className="p-3 bg-stone-50 border border-stone-200 rounded text-[11px] text-stone-700 text-left overflow-x-auto font-mono">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors shadow-xs"
            >
              <RotateCcw size={13} />
              Reload GCC Atlas
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
