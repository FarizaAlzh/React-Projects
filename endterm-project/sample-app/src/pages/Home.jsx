import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div>
          <h1 style={{fontSize:42,margin:0}}>Discover beautiful products</h1>
          <p style={{color:'var(--muted)'}}>Minimal, modern, and responsive catalog built for wide screens.</p>
          <div style={{marginTop:18}}>
            <Link to="/items" className="btn">Browse Items</Link>
          </div>
        </div>
        <div className="card hero-card">
          <h3>Featured</h3>
          <div className="grid">
            <div className="card">Stylish Headphones</div>
            <div className="card">Smart Lamp</div>
            <div className="card">Eco Mug</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
