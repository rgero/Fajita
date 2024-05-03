import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/ui/ErrorFallback.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=> window.location.replace("/")}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
