import { useState, useEffect } from 'react'

const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('habit_auth')
    if (savedAuth === 'authenticated') {
      onLogin()
    }
  }, [onLogin])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 300))

    if (password === APP_PASSWORD) {
      localStorage.setItem('habit_auth', 'authenticated')
      onLogin()
    } else {
      setError('Falsches Passwort. Bitte versuche es erneut.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="login-page">
      <div className="card login-card animate-slide-up">
        <div className="login-logo">🚀</div>
        <h1 className="login-title">1% Besser</h1>
        <p className="login-subtitle">Was macht dich heute 1% besser?</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Gib dein Passwort ein"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button 
            type="submit" 
            className="btn btn--primary btn--large btn--full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></span>
                Wird geladen...
              </>
            ) : (
              'Einloggen'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
