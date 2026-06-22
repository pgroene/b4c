import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { PasswordGate } from './components/PasswordGate'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordGate>
      <RouterProvider router={router} />
    </PasswordGate>
  </StrictMode>,
)
