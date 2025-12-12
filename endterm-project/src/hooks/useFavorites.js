import { useCallback, useEffect } from 'react';
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
  const favorites = useSelector((state) => state.favorites.items);
  const mergeMessage = useSelector((state) => state.favorites.mergeMessage);

  useEffect(() => {
    const loadFavorites = async () => {
      if (currentUser) {
        const { favorites: mergedFavorites, mergedFromLocal } = await syncFavoritesWithUser(currentUser.uid);
        dispatch(setFavorites(mergedFavorites));
        dispatch(
          setMergeMessage(
            mergedFromLocal ? 'Your local favorites were merged with your account.' : ''
          )
        );
      } else {
        dispatch(setFavorites(getLocalFavorites()));
        dispatch(setMergeMessage(''));
      }
    };

    loadFavorites();
  }, [currentUser, dispatch]);

  const addFavorite = useCallback(
    async (item) => {
      const formattedItem = formatFavoriteItem(item);

      if (currentUser) {
        const updatedFavorites = await addRemoteFavorite(currentUser.uid, formattedItem);
        dispatch(setFavorites(updatedFavorites));
      } else {
        const updatedFavorites = addLocalFavorite(formattedItem);
        dispatch(setFavorites(updatedFavorites));
      }
    },
    [currentUser, dispatch]
  );

  const removeFavorite = useCallback(
    async (itemId) => {
      const normalizedId = String(itemId);

      if (currentUser) {
        const updatedFavorites = await removeRemoteFavorite(currentUser.uid, normalizedId);
        dispatch(setFavorites(updatedFavorites));
      } else {
        const updatedFavorites = removeLocalFavorite(normalizedId);
        dispatch(setFavorites(updatedFavorites));
      }
    },
    [currentUser, dispatch]
  );

  return {
    favorites,
    mergeMessage,
    addFavorite,
    removeFavorite,
  };
};

export default useFavorites;
