import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSingle } from '../utils/apiRoutes';
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const response = await getSingle();
    const data = await response.json()
    return data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
});

const initialState = {
  value: {
    name: '',
    id: null,
  },
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.value = action.payload;
    },
    setLogout: (state) => {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
