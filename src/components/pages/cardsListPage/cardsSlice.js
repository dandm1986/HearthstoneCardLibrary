// Импорт из внешних библиотек
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Импорт методов
import { useHttp } from '../../../hooks/http.hook';

const initialState = {
  cards: null,
  cardsLoadingStatus: 'idle',
  queryData: {
    apiBase: 'https://us.api.blizzard.com/hearthstone',
    endpoint: '/cards',
    filters: {
      locale: 'ru_RU',
      set: `core`,
      page: 1,
      pageSize: 10,
    },
  },
  currentPage: null,
};

export const fetchCards = createAsyncThunk('cards/fetchCards', (url) => {
  const { getData } = useHttp();

  return getData(url);
});

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setQueryFilters: (state, action) => {
      state.queryData.filters = {
        ...state.queryData.filters,
        ...action.payload,
      };
    },
    displayCard: (state, action) => {
      state.currentCard = action.payload;
    },
    prevPage: (state, action) => {
      state.queryData.filters.page = action.payload;
    },
    nextPage: (state, action) => {
      state.queryData.filters.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.cardsLoadingStatus = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.currentPage = action.payload.page;
        state.cards = null;
        state.cards = action.payload;
        state.cardsLoadingStatus = 'idle';
      })
      .addCase(fetchCards.rejected, (state) => {
        state.cardsLoadingStatus = 'error';
      });
  },
});

const { actions, reducer } = cardsSlice;

export default reducer;

export const {
  setQueryFilters,
  setCurrentFilters,
  displayCard,
  prevPage,
  nextPage,
} = actions;
