import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db as database } from '../firebaseConfig';

const FAVORITES_KEY = 'favorites';
const FAVORITES_COLLECTION = 'favorites';

const normalizeFavorite = (favorite) => ({
  id: String(favorite.id),
  title: favorite.title || favorite.name || 'Unnamed item',
  image: favorite.image || favorite.thumbnail || '',
  url: favorite.url || '',
});

const normalizeFavoritesArray = (favorites = []) => {
  const unique = new Map();

  favorites.forEach((favorite) => {
    const normalized = normalizeFavorite(favorite);
    if (!unique.has(normalized.id)) {
      unique.set(normalized.id, normalized);
    }
  });

  return Array.from(unique.values());
};

const saveLocalFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
};

export const getLocalFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? normalizeFavoritesArray(JSON.parse(favorites)) : [];
};

const persistRemoteFavorites = async (userId, favorites) => {
  const normalizedFavorites = normalizeFavoritesArray(favorites);
  try {
    await setDoc(
      doc(database, FAVORITES_COLLECTION, userId),
      { items: normalizedFavorites },
      { merge: true }
    );
    saveLocalFavorites(normalizedFavorites);
    return normalizedFavorites;
  } catch (err) {
    console.warn('Could not persist remote favorites (possibly offline):', err.message || err);
    // Fallback: save locally and return normalized favorites so UI remains functional
    saveLocalFavorites(normalizedFavorites);
    return normalizedFavorites;
  }
};

export const formatFavoriteItem = (item) => ({
  id: String(item.id),
  title: item.title || item.name || 'Unnamed item',
  image: item.thumbnail || item.image || '',
  url: item.url || '',
});

export const addLocalFavorite = (item) => {
  const favorites = getLocalFavorites();
  const formattedItem = formatFavoriteItem(item);

  if (!favorites.some((favorite) => favorite.id === formattedItem.id)) {
    favorites.push(formattedItem);
  }
  return saveLocalFavorites(favorites);
};

export const removeLocalFavorite = (itemId) => {
  const favorites = getLocalFavorites();
  const normalizedId = String(itemId);
  const updatedFavorites = favorites.filter((item) => item.id !== normalizedId);
  return saveLocalFavorites(updatedFavorites);
};

export const getRemoteFavorites = async (userId) => {
  try {
    const snapshot = await getDoc(doc(database, FAVORITES_COLLECTION, userId));
    if (snapshot.exists()) {
      const data = snapshot.data();
      return Array.isArray(data.items) ? normalizeFavoritesArray(data.items) : [];
    }
    return [];
  } catch (err) {
    console.warn('Could not fetch remote favorites (possibly offline):', err.message || err);
    return []; // fallback to empty so UI can use local favorites
  }
};

export const addRemoteFavorite = async (userId, item) => {
  const favorites = await getRemoteFavorites(userId);
  const formattedItem = formatFavoriteItem(item);

  if (!favorites.some((favorite) => favorite.id === formattedItem.id)) {
    favorites.push(formattedItem);
  }
  return persistRemoteFavorites(userId, favorites);
};

export const removeRemoteFavorite = async (userId, itemId) => {
  const favorites = await getRemoteFavorites(userId);
  const normalizedId = String(itemId);
  const updatedFavorites = favorites.filter((item) => item.id !== normalizedId);
  return persistRemoteFavorites(userId, updatedFavorites);
};

export const syncFavoritesWithUser = async (userId) => {
  const localFavorites = getLocalFavorites();
  const remoteFavorites = await getRemoteFavorites(userId);
  const remoteIds = new Set(remoteFavorites.map((item) => item.id));

  let mergedFromLocal = false;
  const mergedFavorites = [...remoteFavorites];

  localFavorites.forEach((favorite) => {
    if (!remoteIds.has(favorite.id)) {
      mergedFavorites.push(favorite);
      mergedFromLocal = true;
    }
  });

  await persistRemoteFavorites(userId, mergedFavorites);

  return {
    favorites: mergedFavorites,
    mergedFromLocal: mergedFromLocal && localFavorites.length > 0,
  };
};