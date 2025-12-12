import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      nav('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="card">
        <div style={{marginBottom:8}}>
          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div style={{marginBottom:8}}>
          <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div>
          <button className="btn" type="submit">Login</button>
        </div>
        {error && <p style={{color:'salmon'}}>{error}</p>}
      </form>
    </div>
  )
}

export default Login
