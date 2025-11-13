import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { getToken } from '../lib/auth'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }
    const run = async () => {
      try {
        const data = await apiFetch('/auth/me', { token })
        setUser(data.user)
      } catch (_) {
        // ignore errors; treat as logged out
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) return null

  if (user) {
    return (
      <section className="hero">
        <div className="container">
          <h1>Welcome back, {user.name} ({user.role === 'admin' ? 'Admin' : 'User'})</h1>
          <p>Your email: {user.email}</p>
          <div className="cta">
            <Link to="/dashboard" className="btn primary">Go to Dashboard</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Secure Role-based Access for Modern Apps</h1>
          <p>
            A clean, production-ready starter with authentication, role-based dashboards,
            and a polished UI. Built with React, Express, JWT, and MongoDB.
          </p>
          <div className="cta">
            <Link to="/signup" className="btn primary">Get Started</Link>
            <Link to="/login" className="btn">Login</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container grid">
          <div className="card">
            <h3>Role-based Auth</h3>
            <p>Signup as User or Admin and access a protected dashboard with your role.</p>
          </div>
          <div className="card">
            <h3>Secure by Default</h3>
            <p>Passwords hashed with bcrypt and stateless auth with JWT.</p>
          </div>
          <div className="card">
            <h3>Deploy Anywhere</h3>
            <p>Frontend to Netlify, backend to Render — free-tier friendly.</p>
          </div>
        </div>
      </section>
    </>
  )
}
