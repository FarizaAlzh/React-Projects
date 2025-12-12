import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';  // Для навигации и рендеринга дочерних компонентов
import { useAuth } from '../AuthContext';  // Для получения текущего пользователя
import { getProfilePictureUrl } from '../services/profileService';  // Импортируем правильно

const Layout = () => {
  const { currentUser } = useAuth() || {};  // Защита от ошибки, если useAuth() вернул null или undefined
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

  return (
    <div>
      {/* Навигационное меню */}
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/items">Items</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            {currentUser ? (
              <li><Link to="/profile">Profile</Link></li>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>

        {profilePicture ? (
          <img src={profilePicture} alt="Profile" width="50" height="50" />
        ) : (
          <p>No profile picture</p>
        )}
      </header>

      {/* Рендеринг дочерних компонентов */}
      <main>
        <Outlet /> {/* Это место, где будут рендериться дочерние страницы */}
      </main>
    </div>
  );
};

export default Layout;
