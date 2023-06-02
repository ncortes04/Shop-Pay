import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostData } from '../utils/apiRoutes';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await getPostData();
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  unfilteredData: [],
  filteredData: [],
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    resetFilteredData: (state) => {
      state.filteredData = state.unfilteredData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.unfilteredData = action.payload;
      state.filteredData = action.payload;
    });
  },
});

export const { setFilteredData, resetFilteredData } = postSlice.actions;

export default postSlice.reducer;
