// Импорт из внешних библиотек
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Импорт методов
import { useHttp } from '../../../hooks/http.hook';
import { getToken } from '../../../services/hearthstoneApiService';

const initialState = {
  metadata: null,
  metadataLoadingStatus: 'idle',
  tokenLoadingStatus: 'idle',
  queryData: {
    apiBase: 'https://us.api.blizzard.com/hearthstone',
    endpoint: '/metadata',
    filters: {
      locale: 'ru_RU',
    },
  },
};

export const fetchToken = createAsyncThunk('start/getToken', async () => {
  return await getToken();
});

export const fetchMetadata = createAsyncThunk(
  'start/fetchMetadata',
  async (url) => {
    const { getData } = useHttp();
    return await getData(url);
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
