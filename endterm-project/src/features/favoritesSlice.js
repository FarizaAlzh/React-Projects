import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  mergeMessage: '',
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    setMergeMessage: (state, action) => {
      state.mergeMessage = action.payload;
    },
  },
});

export const { setFavorites, setMergeMessage } = favoritesSlice.actions;
export default favoritesSlice.reducer;
