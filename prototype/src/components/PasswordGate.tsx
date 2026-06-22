import React, { useState, useEffect } from 'react'

/**
 * LoginGate — wraps the entire app with a username + password check.
 *
 * Credentials are injected at container start via DEMO_USERNAME / DEMO_PASSWORD
 * env vars (docker-entrypoint.sh → /config.js). Never baked into the image.
 * Auth state lives in sessionStorage: survives refresh, clears on tab close.
 *
 * @requirement *
 * @scope shell
 */

const SESSION_KEY = 'b4c_demo_auth'

declare global {
  interface Window {
    __DEMO_CONFIG__?: { demoUsername?: string; demoPassword?: string }
  }
}

function getCredentials(): { username: string; password: string } | null {
  const u = window.__DEMO_CONFIG__?.demoUsername
  const p = window.__DEMO_CONFIG__?.demoPassword
  const validU = u && u !== '__DEMO_USERNAME__' && u.trim() !== ''
  const validP = p && p !== '__DEMO_PASSWORD__' && p.trim() !== ''
  if (validU && validP) return { username: u!.trim(), password: p!.trim() }
  // Fallback to Vite build-time env vars (local dev)
  const bu = (import.meta.env.VITE_DEMO_USERNAME as string | undefined)?.trim()
  const bp = (import.meta.env.VITE_DEMO_PASSWORD as string | undefined)?.trim()
  if (bu && bp) return { username: bu, password: bp }
  return null  // no credentials configured → open access
}

interface Props { children: React.ReactNode }

export function PasswordGate({ children }: Props): React.JSX.Element {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (!getCredentials()) return true
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (!getCredentials()) return
    if (sessionStorage.getItem(SESSION_KEY) === 'true') setAuthed(true)
  }, [])

  if (authed) return <>{children}</>

  function attempt() {
    const creds = getCredentials()
    if (!creds || (username.trim() === creds.username && password === creds.password)) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAuthed(true)
    } else {
      setError(true)
      setShake(true)
      setPassword('')
      setTimeout(() => setShake(false), 500)
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') attempt()
  }

  const inputStyle = (hasError: boolean) => ({
    background: '#112B4C',
    borderColor: hasError ? '#E34F4F' : 'rgba(255,255,255,0.12)',
    color: 'white',
  })

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ background: '#0A1F35' }}>

      <div className="w-full max-w-sm"
        style={shake ? { animation: 'shake 0.45s ease-in-out' } : {}}>

        <img src="/assets/b4code-logo.jpeg" alt="B4Code"
          className="h-10 mb-8 object-contain object-left"
          onError={(e) => (e.currentTarget.style.display = 'none')} />

        <div className="text-[11px] font-mono text-[#E36F21] uppercase tracking-widest mb-2">
          Demo access
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Sign in</h1>
        <p className="text-[#6B7A90] text-sm mb-8">
          This demo is private. Contact the B4Code team for access.
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[#6B7A90] text-xs font-medium">Username</label>
            <input
              type="text"
              autoFocus
              autoComplete="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(false) }}
              onKeyDown={onKey}
              placeholder="b4code"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors"
              style={inputStyle(error)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#6B7A90] text-xs font-medium">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              onKeyDown={onKey}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-colors"
              style={inputStyle(error)}
            />
          </div>

          {error && (
            <p className="text-[#E34F4F] text-xs">
              Incorrect username or password. Try again.
            </p>
          )}

          <button
            onClick={attempt}
            className="w-full py-3 font-semibold rounded-xl text-sm text-white mt-1"
            style={{ background: '#E36F21' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Sign in →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}

