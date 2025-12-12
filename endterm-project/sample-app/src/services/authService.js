import { signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'

export const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const logout = () => fbSignOut(auth)

export const observeAuth = (cb) => {
  return onAuthStateChanged(auth, (user) => cb(user))
}
