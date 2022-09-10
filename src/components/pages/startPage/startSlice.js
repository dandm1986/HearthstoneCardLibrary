import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { useHttp } from '../../../hooks/http.hook';
import { getToken, createURL } from '../../../services/hearthstoneApiService';

const initialState = {
  metadata: {},
  metadataLoadingStatus: 'idle',
  queryData: {
    apiBase: 'https://us.api.blizzard.com/hearthstone',
    endpoint: '/metadata',
    filters: {
      locale: 'ru_RU',
    },
  },
  currentFilters: '',
};

export const fetchMetadata = createAsyncThunk(
  'start/fetchMetadata',
  async ({ apiBase, endpoint, item, filters }) => {
    const { getData } = useHttp();

    await getToken();

    const url = createURL({
      apiBase,
      endpoint,
      item,
      filters,
    });

    return getData(url);
  }
);

const startSlice = createSlice({
  name: 'start',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadata.pending, (state) => {
        state.metadataLoadingStatus = 'loading';
      })
      .addCase(fetchMetadata.fulfilled, (state, action) => {
        state.metadata = action.payload;
        state.metadataLoadingStatus = 'idle';
      })
      .addCase(fetchMetadata.rejected, (state) => {
        state.metadataLoadingStatus = 'error';
      });
  },
});

const { reducer } = startSlice;

export default reducer;
