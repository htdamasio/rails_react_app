import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CableProvider } from './contexts/cable.tsx';
import AppRoutes from './routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CableProvider>
      <AppRoutes />
    </CableProvider>
  </StrictMode>,
)
