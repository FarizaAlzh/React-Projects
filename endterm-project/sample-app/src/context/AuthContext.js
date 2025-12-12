import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'
import { observeAuth, logout as fbLogout, login as fbLogin } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = observeAuth((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const login = (email, password) => fbLogin(email, password)
  const logout = () => fbLogout()

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
