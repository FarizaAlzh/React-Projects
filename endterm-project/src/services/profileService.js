import { auth } from '../firebaseConfig';

export const getUserProfile = () => {
  const user = auth.currentUser;
  return user ? user : null; 
};

export const updateUserProfile = async (displayName, photoURL) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await user.updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      });
      return 'Profile updated successfully'; 
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;  
    }
  } else {
    throw new Error('User not logged in');
  }
};

export const getProfilePictureUrl = () => {
  const user = auth.currentUser;  // Получаем текущего пользователя
  return user ? user.photoURL : null;  // Если пользователь есть, возвращаем его фото, иначе null
};