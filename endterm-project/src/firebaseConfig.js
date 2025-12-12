import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBtvWUZPDiyMTNHBP0AzngxQB4TpCULDzI",
  authDomain: "my-firebase-project-1ffc3.firebaseapp.com",
  projectId: "my-firebase-project-1ffc3",
  storageBucket: "my-firebase-project-1ffc3.firebasestorage.app",
  messagingSenderId: "165898043604",
  appId: "1:165898043604:web:b85da24f7b51ad240d7b41",
  measurementId: "G-5K5JRHZVHY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };