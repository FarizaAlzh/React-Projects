import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (query) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    const data = await response.json();
    return data.products; 
  }
);


export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed getting item id');
    }
    const data = await response.json();
    return data;
  }
);

const initialState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: "",
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload; 
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.error.message; 
      });

    builder
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload; 
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.error.message; 
      });
  },
});

export const { setQuery } = itemsSlice.actions;
export default itemsSlice.reducer;
