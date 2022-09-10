import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/http.hook';

import { createURL } from '../../../services/hearthstoneApiService';

const initialState = {
  cards: {},
  cardsLoadingStatus: 'idle',
  queryData: {
    apiBase: 'https://us.api.blizzard.com/hearthstone',
    endpoint: {
      metadata: '/metadata',
      cards: '/cards',
      decks: '/deck',
    },
    filters: {
      locale: 'ru_RU',
      set: `core`,
      page: 1,
      pageSize: 10,
    },
  },
};

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  ({ apiBase, endpoint, item, filters }) => {
    const { getData } = useHttp();

    const url = createURL({
      apiBase,
      endpoint,
      item,
      filters,
    });

    return getData(url);
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    clearState: (state) => {
      state.cards = {};
    },
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

export const { clearState, setQueryFilters, displayCard, prevPage, nextPage } =
  actions;
