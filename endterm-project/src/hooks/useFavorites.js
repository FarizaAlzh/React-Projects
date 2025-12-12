import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import {
  addLocalFavorite,
  addRemoteFavorite,
  formatFavoriteItem,
  getLocalFavorites,
  removeLocalFavorite,
  removeRemoteFavorite,
  syncFavoritesWithUser,
} from '../services/favoritesService';
import { setFavorites, setMergeMessage } from '../features/favoritesSlice';

const useFavorites = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const reduxUser = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.items);
  const mergeMessage = useSelector((state) => state.favorites.mergeMessage);

  const prevUserRef = useRef(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const userId = reduxUser?.uid || currentUser?.uid;
        const wasLoggedIn = !!prevUserRef.current;
        if (userId) {
          const { favorites: mergedFavorites, mergedFromLocal } = await syncFavoritesWithUser(userId);
          dispatch(setFavorites(mergedFavorites));
          dispatch(setMergeMessage(mergedFromLocal ? 'Your local favorites were merged with your account.' : ''));
          if (mergedFromLocal) {
            // clear merge message after a few seconds so it doesn't persist forever
            setTimeout(() => dispatch(setMergeMessage('')), 6000);
          }
        } else {
          // If user just logged out, clear favorites from state
          if (wasLoggedIn) {
            dispatch(setFavorites([]));
            dispatch(setMergeMessage(''));
          } else {
            dispatch(setFavorites(getLocalFavorites()));
            dispatch(setMergeMessage(''));
          }
        }
      } catch (err) {
        console.warn('Failed to load favorites (possibly offline):', err.message || err);
        // fallback to local favorites if anything goes wrong
        dispatch(setFavorites(getLocalFavorites()));
        dispatch(setMergeMessage(''));
      }
    };

    loadFavorites();
    prevUserRef.current = reduxUser?.uid || currentUser?.uid || null;
  }, [currentUser, reduxUser, dispatch]);

  const addFavorite = useCallback(
    async (item) => {
      const formattedItem = formatFavoriteItem(item);

      const userId = reduxUser?.uid || currentUser?.uid;
      console.log('useFavorites.addFavorite()', { item, formattedItem, userId });

      if (userId) {
        const updatedFavorites = await addRemoteFavorite(userId, formattedItem);
        dispatch(setFavorites(updatedFavorites));
      } else {
        const updatedFavorites = addLocalFavorite(formattedItem);
        dispatch(setFavorites(updatedFavorites));
      }
    },
    [currentUser, reduxUser, dispatch]
  );

  const removeFavorite = useCallback(
    async (itemId) => {
      const normalizedId = String(itemId);
      const userId = reduxUser?.uid || currentUser?.uid;

      console.log('useFavorites.removeFavorite()', { itemId: normalizedId, userId });

      if (userId) {
        const updatedFavorites = await removeRemoteFavorite(userId, normalizedId);
        dispatch(setFavorites(updatedFavorites));
      } else {
        const updatedFavorites = removeLocalFavorite(normalizedId);
        dispatch(setFavorites(updatedFavorites));
      }
    },
    [currentUser, reduxUser, dispatch]
  );

  return {
    favorites,
    mergeMessage,
    addFavorite,
    removeFavorite,
  };
};

export default useFavorites;