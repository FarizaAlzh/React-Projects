import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { useAuth } from '../context/AuthContext'

const sampleItems = [
  { id: 101, title: 'Wireless Headphones', description: 'Comfortable, long battery', price: 79, image: '' },
  { id: 102, title: 'Smart Lamp', description: 'Warm/cool light modes', price: 39, image: '' },
  { id: 103, title: 'Eco Mug', description: 'Keeps drinks hot', price: 15, image: '' },
  { id: 104, title: 'Notebook Pro', description: 'Sleek, light', price: 129, image: '' },
]

const Items = () => {
  const { items: favs, addFavorite, removeFavorite } = useFavorites()
  const { currentUser } = useAuth()

  const isFav = (id) => favs.some((f) => String(f.id) === String(id))

  return (
    <div>
      <h2>Items</h2>
      <div className="items-grid">
        {sampleItems.map((it) => (
          <div key={it.id} className="card item-card">
            <h4>{it.title}</h4>
            <p style={{color:'var(--muted)'}}>{it.description}</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontWeight:700}}>${it.price}</div>
              <div>
                <button
                  className="fav-btn"
                  onClick={() => {
                    if (!currentUser) return alert('Please log in')
                    if (isFav(it.id)) removeFavorite(it.id)
                    else addFavorite(it)
                  }}
                >
                  {isFav(it.id) ? '★' : '☆'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Items
