/* Main entry point for the application - renders the root React component */
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { HelmetProvider } from '@/components/Helmet'

// @skip-protected: Do not remove. Required for React rendering.
createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
)
