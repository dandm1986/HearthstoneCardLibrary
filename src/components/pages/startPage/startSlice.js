// Импорт из внешних библиотек
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Импорт методов
import { useHttp } from '../../../hooks/http.hook';
import { getToken } from '../../../services/hearthstoneApiService';

const initialState = {
  metadata: null,
  metadataLoadingStatus: 'idle',
  queryData: {
    apiBase: 'https://us.api.blizzard.com/hearthstone',
    endpoint: '/metadata',
    filters: {
      locale: 'ru_RU',
    },
  },
};

export const fetchMetadata = createAsyncThunk(
  'start/fetchMetadata',
  async (url) => {
    const { getData } = useHttp();

    await getToken();

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
