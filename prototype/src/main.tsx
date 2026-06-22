import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { PasswordGate } from './components/PasswordGate'
import { PersonaProvider } from './contexts/PersonaContext'
import { LanguageProvider } from './contexts/LanguageContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <PasswordGate>
        <PersonaProvider>
          <RouterProvider router={router} />
        </PersonaProvider>
      </PasswordGate>
    </LanguageProvider>
  </StrictMode>,
)
