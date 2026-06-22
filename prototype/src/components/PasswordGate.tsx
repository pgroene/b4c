import React, { useState, useEffect } from 'react'

/**
 * PasswordGate — wraps the entire app with a simple password check.
 *
 * Password is set via VITE_DEMO_PASSWORD env var (never committed to git).
 * Auth state is stored in sessionStorage so it survives page refreshes
 * within a tab but clears when the browser session ends.
 *
 * @requirement *
 * @scope shell
 */

const SESSION_KEY = 'b4c_demo_auth'

// Runtime config injected by docker-entrypoint.sh via /config.js.
// Falls back to Vite build-time env var for local dev.
declare global {
  interface Window { __DEMO_CONFIG__?: { demoPassword?: string } }
}
function getRequiredPassword(): string | undefined {
  const runtime = window.__DEMO_CONFIG__?.demoPassword
  if (runtime && runtime !== '__DEMO_PASSWORD__' && runtime.trim() !== '') return runtime
  const buildTime = import.meta.env.VITE_DEMO_PASSWORD as string | undefined
  return buildTime?.trim() || undefined
}

interface Props {
  children: React.ReactNode
}

export function PasswordGate({ children }: Props): React.JSX.Element {
  const [authed, setAuthed] = useState<boolean>(() => {
    const REQUIRED_PASSWORD = getRequiredPassword()
    if (!REQUIRED_PASSWORD) return true
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const REQUIRED_PASSWORD = getRequiredPassword()
    if (!REQUIRED_PASSWORD) return
    if (sessionStorage.getItem(SESSION_KEY) === 'true') setAuthed(true)
  }, [])

  if (authed) return <>{children}</>

  function attempt() {
    const REQUIRED_PASSWORD = getRequiredPassword()
    if (input === REQUIRED_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAuthed(true)
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 600)
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') attempt()
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ background: '#0A1F35' }}
    >
      <div
        className={`w-full max-w-sm transition-transform ${shake ? 'animate-shake' : ''}`}
        style={shake ? { animation: 'shake 0.5s ease-in-out' } : {}}
      >
        {/* Logo */}
        <img
          src="/assets/b4code-logo.jpeg"
          alt="B4Code"
          className="h-10 mb-8 object-contain object-left"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />

        <div className="text-[11px] font-mono text-[#E36F21] uppercase tracking-widest mb-2">
          Demo access
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Enter demo password</h1>
        <p className="text-[#6B7A90] text-sm mb-8">
          This demo is private. Contact the B4Code team for access.
        </p>

        <div className="flex flex-col gap-3">
          <input
            type="password"
            autoFocus
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false) }}
            onKeyDown={onKey}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none border transition-colors"
            style={{
              background: '#112B4C',
              borderColor: error ? '#E34F4F' : 'rgba(255,255,255,0.12)',
            }}
          />
          {error && (
            <p className="text-[#E34F4F] text-xs -mt-1">Incorrect password. Try again.</p>
          )}
          <button
            onClick={attempt}
            className="w-full py-3 font-semibold rounded-xl text-sm text-white transition-colors"
            style={{ background: '#E36F21' }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Enter →
          </button>
        </div>
      </div>

      {/* shake keyframe */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
