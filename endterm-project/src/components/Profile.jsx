import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import UploadProfilePicture from './UploadProfilePicture';
import useFavorites from '../hooks/useFavorites';
import { getProfilePictureUrl } from '../services/profileService';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [photoURL, setPhotoURL] = useState(null);

  const handleLogout = () => {
    const doLogout = async () => {
      try {
        await signOut(auth);
      } catch (err) {
        console.error('Firebase signOut error', err);
      }
      dispatch(logout());
    };
    doLogout();
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (currentUser && currentUser.uid) {
        const url = await getProfilePictureUrl(currentUser.uid);
        if (mounted) setPhotoURL(url);
      }
    };
    load();
    return () => { mounted = false; };
  }, [currentUser]);

  const { favorites, removeFavorite, addFavorite } = useFavorites();

  if (!currentUser) {
    return <p className="app-container">Please log in to view your profile.</p>;
  }

  return (
    <div className="app-container profile-page">
      <div className="profile-header card">
        {photoURL ? (
          <img className="profile-thumb" src={photoURL} alt="Profile" width={120} height={120} />
        ) : (
          <div className="profile-thumb" style={{ background: 'linear-gradient(90deg,var(--brand-purple),var(--brand-yellow))' }} />
        )}
        <div>
          <h2>{currentUser.email}</h2>
          <p className="muted">Welcome to your profile. Manage your account and preferences here.</p>
        </div>
      </div>

      <div className="upload-box card">
        <UploadProfilePicture onUploaded={(url) => setPhotoURL(url)} />
      </div>

      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Your Favorites</h3>
        {favorites.length === 0 ? (
          <p>No items in favorites</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((item) => (
              <div key={item.id} className="favorite-item card" style={{ marginBottom: 8 }}>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                {item.image && <img src={item.image} alt={item.title} width="80" style={{ marginTop: 6 }} />}
                <div style={{ marginTop: 8 }}>
                  <button className="btn secondary" onClick={() => removeFavorite(String(item.id))}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
