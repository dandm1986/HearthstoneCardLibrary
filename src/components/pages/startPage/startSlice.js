import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { useHttp } from '../../../hooks/http.hook';
import {
  getToken,
  fetchMetadataUrl,
} from '../../../services/hearthstoneApiService';

const initialState = {
  metadata: null,
  metadataLoadingStatus: 'idle',
  tokenLoadingStatus: 'idle',
  queryData: {
    apiBase: 'https://us.api.blizzard.com/hearthstone',
    endpoint: '/metadata',
    filters: {
      locale: 'en_US',
    },
  },
};

export const fetchToken = createAsyncThunk('start/getToken', async () => {
  return await getToken();
});

export const fetchMetadata = createAsyncThunk(
  'start/fetchMetadata',
  async (filters = {}) => {
    const { getData } = useHttp();
    return await getData(fetchMetadataUrl(filters));
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
      })
      .addCase(fetchToken.pending, (state) => {
        state.tokenLoadingStatus = 'loading';
      })
      .addCase(fetchToken.fulfilled, (state) => {
        state.tokenLoadingStatus = 'idle';
      })
      .addCase(fetchToken.rejected, (state) => {
        state.tokenLoadingStatus = 'error';
      });
  },
});

const { reducer } = startSlice;

export default reducer;
