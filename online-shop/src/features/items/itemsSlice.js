import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllItems , getItemById } from '../../services/ProductService';


export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (query) => {
    const data = await getAllItems(query);
    return data;
  }
);


export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id) => {
    const data = await getItemById(id);
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
          state.list = action.payload
                        
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
