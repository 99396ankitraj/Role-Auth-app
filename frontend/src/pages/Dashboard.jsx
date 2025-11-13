import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../lib/api'
import { getToken, clearToken } from '../lib/auth'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = getToken()
    const run = async () => {
      try {
        const data = await apiFetch('/auth/me', { token })
        setUser(data.user)
        if (data.user.role === 'admin') {
          const list = await apiFetch('/users', { token })
          setUsers(list.users || [])
        }
      } catch (e) {
        setError(e.message)
      }
    }
    run()
  }, [])

  const logout = () => {
    clearToken()
    navigate('/login')
  }

  if (error) return <div className="container" style={{ padding: '40px 0' }}>Error: {error}</div>
  if (!user) return <div className="container" style={{ padding: '40px 0' }}>Loading...</div>

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Welcome, {user.name} ({user.role === 'admin' ? 'Admin' : 'User'})</h1>
        <p style={{ color: 'var(--muted)' }}>Your email: {user.email}</p>
        <div style={{ marginTop: 16 }}>
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      </div>
      {user.role === 'admin' && (
        <div className="card" style={{ marginTop: 18 }}>
          <h3 style={{ marginTop: 0 }}>All Users</h3>
          {users.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>No users found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 6px' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '8px 6px' }}>Email</th>
                    <th style={{ textAlign: 'left', padding: '8px 6px' }}>Role</th>
                    <th style={{ textAlign: 'left', padding: '8px 6px' }}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.email}>
                      <td style={{ padding: '8px 6px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>{u.name}</td>
                      <td style={{ padding: '8px 6px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>{u.email}</td>
                      <td style={{ padding: '8px 6px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>{u.role}</td>
                      <td style={{ padding: '8px 6px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>{new Date(u.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
