import { Link, useLocation } from 'react-router-dom'
import { getToken, clearToken } from '../lib/auth'

export default function Navbar() {
  const location = useLocation()
  const authed = Boolean(getToken())

  const onLogout = () => {
    clearToken()
    // Redirect via hard navigate to refresh state simply
    window.location.href = '/login'
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <div className="logo" />
          <span>Inbotiq</span>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          {authed ? (
            <button onClick={onLogout} className="btn" style={{ background: 'transparent', cursor: 'pointer' }}>Logout</button>
          ) : (
            <>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
              <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
