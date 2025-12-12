import { auth, db, storage } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

export const getUserProfile = () => {
  const user = auth.currentUser;
  return user ? user : null;
};

export const updateUserProfile = async (displayName, photoURL) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      await setDoc(doc(db, 'users', user.uid), { displayName, photoURL }, { merge: true });
      return 'Profile updated successfully';
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  } else {
    throw new Error('User not logged in');
  }
};

export const getProfilePictureUrl = async (userId) => {
  try {
    if (!userId) {
      const user = auth.currentUser;
      return user ? user.photoURL : null;
    }
    const snap = await getDoc(doc(db, 'users', userId));
    if (snap.exists()) {
      const data = snap.data();
      return data.photoURL || (auth.currentUser ? auth.currentUser.photoURL : null) || null;
    }
    return auth.currentUser ? auth.currentUser.photoURL : null;
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    return auth.currentUser ? auth.currentUser.photoURL : null;
  }
};

export const uploadProfilePicture = async (userId, file) => {
  if (!userId) throw new Error('Missing userId');
  try {
    const storageRef = ref(storage, `profilePictures/${userId}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await setDoc(doc(db, 'users', userId), { photoURL: url }, { merge: true });
    if (auth.currentUser && auth.currentUser.uid === userId) {
      await updateProfile(auth.currentUser, { photoURL: url });
    }
    return url;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};