import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBestSellers, getFeaturedItems, getHotTrendingItems } from '../utils/apiRoutes';

export const fetchAnalyticsData = createAsyncThunk('analytics/fetchData', async () => {
  try {
    const bestSellersResponse = await getBestSellers();
    const bestSellingItems = await bestSellersResponse.json();

    const featuredItemsResponse = await getFeaturedItems();
    const featuredItems = await featuredItemsResponse.json();

    const hotTrendingResponse = await getHotTrendingItems();
    const hotTrendingItems = await hotTrendingResponse.json();
    return { bestSellingItems, featuredItems, hotTrendingItems };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  bestSellingItems: [],
  featuredItems: [],
  hotTrendingItems: [],
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAnalyticsData.fulfilled, (state, action) => {
      const { bestSellingItems, featuredItems, hotTrendingItems } = action.payload;
      state.bestSellingItems = bestSellingItems;
      state.featuredItems = featuredItems;
      state.hotTrendingItems = hotTrendingItems;
    });
  },
});

export default analyticsSlice.reducer;
