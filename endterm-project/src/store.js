import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import favoritesReducer from './features/favoritesSlice';
import searchReducer from './features/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    search: searchReducer,
  },
});
