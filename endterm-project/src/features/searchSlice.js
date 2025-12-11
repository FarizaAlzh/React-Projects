import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',  
  page: 1,       
  limit: 10,      
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;  
    },
    setPage: (state, action) => {
      state.page = action.payload; 
    },
    setLimit: (state, action) => {
      state.limit = action.payload; 
    },
  },
});

export const { setSearchTerm, setPage, setLimit } = searchSlice.actions;
export default searchSlice.reducer;
