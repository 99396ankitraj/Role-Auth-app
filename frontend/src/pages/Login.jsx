import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { saveToken } from '../lib/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await apiFetch('/auth/login', { method: 'POST', body: { email, password } })
      saveToken(token)
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p style={{ color: 'var(--muted)', marginTop: -6, marginBottom: 12 }}>Login to access your dashboard</p>
        <form onSubmit={onSubmit} className="form">
          <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="button" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p style={{ marginTop: 12, color: 'var(--muted)' }}>
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
