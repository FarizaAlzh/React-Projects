import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfilePictureUrl } from '../services/profileService';
import { useSelector } from 'react-redux';

const Layout = () => {
  const { currentUser } = useAuth() || {};  // Защита от ошибки, если useAuth() вернул null или undefined
  const user = useSelector((state) => state.auth.user);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const loadProfilePicture = async () => {
      if (currentUser && currentUser.uid) {
        const pictureUrl = await getProfilePictureUrl(currentUser.uid); // Получаем изображение из Firestore
        setProfilePicture(pictureUrl);
      }
    };

    loadProfilePicture();
  }, [currentUser]);  // Загружаем изображение только при изменении currentUser

  useEffect(() => {
    // sync from redux user if available (updates quickly after upload)
    if (user && user.photoURL) setProfilePicture(user.photoURL);
  }, [user]);

  return (
    <div className="app-container">
      <header className="site-header card">
        <div className="header">
          <div className="logo">
            <span className="logo-mark" />
            <div>
              <div style={{ fontWeight: 700, color: 'white' }}>PurpleStore</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>Best picks, every day</div>
            </div>
          </div>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/items">Items</Link>
            <Link to="/favorites">Favorites</Link>
            {currentUser ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </nav>

          <div>
            {profilePicture ? (
              <img className="profile-thumb" src={profilePicture} alt="Profile" />
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--brand-yellow)' }} />
            )}
          </div>
        </div>
      </header>

      <main className="main-area">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
