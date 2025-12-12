import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'

const Favorites = () => {
  const { items, removeFavorite, mergeMessage } = useFavorites()
  const { currentUser } = useAuth()

  return (
    <div>
      <h2>Your Favorites</h2>
      {mergeMessage && <div className="merge-message">{mergeMessage}</div>}
      {!currentUser && <p style={{color:'var(--muted)'}}>You are viewing local favorites (not yet synced).</p>}
      {items.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid">
          {items.map((it) => (
            <div className="card" key={it.id}>
              <h4>{it.title}</h4>
              <div style={{marginTop:8}}>
                <button className="btn ghost" onClick={() => removeFavorite(it.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
