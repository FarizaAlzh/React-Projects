import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h2>{currentUser.email}</h2>
      <p>Welcome to your profile!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
