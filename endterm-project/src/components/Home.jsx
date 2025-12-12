import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="app-screen">
      <section className="hero-full card">
        <div>
          <h2>Discover the Joy of Thoughtful Shopping</h2>
          <p>Shop trendy gadgets, useful home goods, and curated lifestyle items — handpicked for quality and value. Fast delivery, easy returns, and friendly support.</p>
          <div className="features">
            <div className="feature">Free delivery over $50</div>
            <div className="feature">30-day returns</div>
            <div className="feature">Secure payments</div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Link to="/items" className="btn">Shop Now</Link>
            <Link to="/about" className="btn secondary" style={{ marginLeft: 12 }}>About Us</Link>
          </div>
        </div>

        <div>
          <img src="/logo512.png" alt="store" style={{ width: 360, borderRadius: 18 }} />
        </div>
      </section>

      <main className="main-area app-container">
        <h3 style={{ marginTop: 4 }}>Trending Now</h3>
        <p className="muted">Browse curated categories and latest arrivals — click Items to explore our catalog.</p>
      </main>
    </div>
  );
};

export default Home;
