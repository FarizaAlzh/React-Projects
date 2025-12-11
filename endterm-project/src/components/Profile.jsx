import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); 
    } catch (error) {
      console.error("Ошибка при выходе: ", error);
    }
  };

  return (
    <div>
      <h1>Профиль</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Profile;
