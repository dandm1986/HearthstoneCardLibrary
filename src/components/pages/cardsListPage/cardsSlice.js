// Импорт из внешних библиотек
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Импорт методов
import { useHttp } from '../../../hooks/http.hook';
import { fetchCardsUrl } from '../../../services/hearthstoneApiService';

const initialState = {
  cards: null,
  cardsLoadingStatus: 'idle',
  query: {
    page: 1,
    pageSize: 10,
  },
  currentPage: null,
};

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (filters = {}) => {
    const { getData } = useHttp();
    return await getData(fetchCardsUrl(filters));
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
    displayCard: (state, action) => {
      state.currentCard = action.payload;
    },
    prevPage: (state, action) => {
      state.query.page = action.payload;
    },
    nextPage: (state, action) => {
      state.query.page = action.payload;
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

export const { setQuery, displayCard, prevPage, nextPage } = actions;
