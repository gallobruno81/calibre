
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Algo salió mal</h1>
          <p className="text-gray-600 mb-6 max-w-md">
            La aplicación ha encontrado un error crítico. Probablemente se deba a una configuración guardada incorrecta.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left text-xs font-mono overflow-auto max-w-full">
            {this.state.error?.message || "Error desconocido"}
          </div>
          <button 
            onClick={() => {
                localStorage.clear();
                window.location.reload();
            }}
            className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition"
          >
            Reiniciar Configuración (Borrar Datos Locales)
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
