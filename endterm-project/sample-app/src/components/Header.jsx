import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'

const Header = () => {
  const { currentUser, logout } = useAuth()
  const { mergeMessage } = useFavorites() || {}
  const nav = useNavigate()

  const handleAuth = async () => {
    if (currentUser) {
      await logout()
      nav('/')
    } else {
      nav('/login')
    }
  }

  return (
    <header className="site-header">
      <div className="logo">
        <div className="logo-mark" />
        <div>
          <div style={{fontWeight:700}}>BrightShop</div>
          <div style={{fontSize:12}}>Clean, modern catalog</div>
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/items">Items</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      <div style={{display:'flex',alignItems:'center',gap:12}}>
        {mergeMessage && <div className="merge-message">{mergeMessage}</div>}
        <button className="btn ghost" onClick={handleAuth}>{currentUser ? 'Logout' : 'Login'}</button>
      </div>
    </header>
  )
}

export default Header
