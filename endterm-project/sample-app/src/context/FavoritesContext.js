import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import {
  getLocalFavorites,
  saveLocalFavorites,
  getRemoteFavorites,
  persistRemoteFavorites,
  syncFavoritesWithUser,
} from '../services/favoritesService'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [items, setItems] = useState([])
  const [mergeMessage, setMergeMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      if (currentUser?.uid) {
        // sync local -> remote
        const { favorites: merged, mergedFromLocal } = await syncFavoritesWithUser(currentUser.uid)
        setItems(merged)
        if (mergedFromLocal) {
          setMergeMessage('Your local favorites were merged with your account.')
          setTimeout(() => setMergeMessage(''), 5000)
        }
      } else {
        setItems(getLocalFavorites())
        setMergeMessage('')
      }
    }
    load()
  }, [currentUser])

  const addFavorite = async (item) => {
    if (currentUser?.uid) {
      const updated = await persistRemoteFavorites(currentUser.uid, [...items, item])
      setItems(updated)
    } else {
      const next = saveLocalFavorites([...items, item])
      setItems(next)
    }
  }

  const removeFavorite = async (id) => {
    const normalized = String(id)
    const next = items.filter((i) => String(i.id) !== normalized)
    if (currentUser?.uid) {
      const updated = await persistRemoteFavorites(currentUser.uid, next)
      setItems(updated)
    } else {
      saveLocalFavorites(next)
      setItems(next)
    }
  }

  const clearFavorites = () => setItems([])

  return (
    <FavoritesContext.Provider value={{ items, addFavorite, removeFavorite, clearFavorites, mergeMessage }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)

export default FavoritesContext
