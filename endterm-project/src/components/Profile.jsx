import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Profile Page</h2>
      <p>Welcome, {currentUser.email}!</p>
      <button>Logout</button> 
    </div>
  );
};

export default Profile;
