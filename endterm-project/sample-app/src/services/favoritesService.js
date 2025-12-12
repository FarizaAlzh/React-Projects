import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const KEY = 'sample_favorites'

const format = (item) => ({ id: String(item.id), title: item.title || item.name || 'Item', image: item.image || item.thumbnail || '' })

export const getLocalFavorites = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

export const saveLocalFavorites = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list))
  return list
}

export const getRemoteFavorites = async (uid) => {
  if (!uid) return []
  const snap = await getDoc(doc(db, 'favorites', uid))
  if (!snap.exists()) return []
  const data = snap.data()
  return Array.isArray(data.items) ? data.items.map(format) : []
}

export const persistRemoteFavorites = async (uid, items) => {
  if (!uid) return items
  const normalized = items.map(format)
  await setDoc(doc(db, 'favorites', uid), { items: normalized }, { merge: true })
  // also mirror locally
  saveLocalFavorites(normalized)
  return normalized
}

export const syncFavoritesWithUser = async (uid) => {
  const local = getLocalFavorites()
  const remote = await getRemoteFavorites(uid)

  const remoteIds = new Set(remote.map((r) => r.id))
  let merged = [...remote]
  let mergedFromLocal = false
  local.forEach((it) => {
    if (!remoteIds.has(String(it.id))) {
      merged.push(format(it))
      mergedFromLocal = true
    }
  })

  const persisted = await persistRemoteFavorites(uid, merged)
  return { favorites: persisted, mergedFromLocal }
}
