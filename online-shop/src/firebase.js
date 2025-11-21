import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBtvWUZPDiyMTNHBP0AzngxQB4TpCULDzI",
  authDomain: "my-firebase-project-1ffc3.firebaseapp.com",
  projectId: "my-firebase-project-1ffc3",
  storageBucket: "my-firebase-project-1ffc3.firebasestorage.app",
  messagingSenderId: "165898043604",
  appId: "1:165898043604:web:c2fcd7d2fd2ddfcf0d7b41",
  measurementId: "G-VKJKHVWP5B"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const analytics = getAnalytics(app);

export { auth, app };
