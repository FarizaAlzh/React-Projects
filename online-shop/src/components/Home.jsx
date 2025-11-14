import React from 'react';
import '../styles/Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to My Project</h1>
        <p>
          This is a simple yet elegant space where you can explore everything about the project. Whether you're looking for products, services, or just getting started, you're in the right place.
        </p>
      </div>

      <div className="content-section">
        <h2>Why Choose Us?</h2>
        <p>
          We offer high-quality services with a focus on user experience. Our team works hard to ensure that every interaction is smooth and enjoyable.
        </p>
        <img src="photos/onlineshop.jpeg" alt="Project Image" className="home-image" />
      </div>

      <footer className="footer">
        <p>&copy; 2025 My Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
