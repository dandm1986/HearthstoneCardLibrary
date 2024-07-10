import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { useHttp } from '../../../hooks/http.hook';
import {
  fetchHeroesUrl,
  createIdList,
} from '../../../services/hearthstoneApiService';

const initialState = {
  heroes: null,
  heroesLength: 0,
  heroesLoadingStatus: 'idle',
  heroCards: null,
  currentHeroCardIdx: null,
  heroCardsLoadingStatus: 'idle',
  queryData: {
    apiBase: 'https://us.api.blizzard.com/hearthstone',
    endpoint: '/deck',
    filters: {
      locale: 'en_US',
    },
  },
};

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async (filters = {}) => {
    const { getData } = useHttp();
    const hero = await getData(fetchHeroesUrl(filters));
    return hero;
  }
);

export const fetchHeroCards = createAsyncThunk(
  'heroes/fetchHeroCards',
  async (ids) => {
    const { getData } = useHttp();
    return await getData(fetchHeroesUrl({ ids: createIdList(ids) }));
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroes: (state, action) => {
      state.heroes = action.payload;
      state.heroesLength = action.payload.length;
    },
    displayHero: (state, action) => {
      state.currentHero = action.payload;
    },
    resetCurrentHeroIdx: (state) => {
      state.currentHeroCardIdx = 0;
    },
    prevHero: (state, action) => {
      state.currentHeroCardIdx = action.payload;
    },
    nextHero: (state, action) => {
      state.currentHeroCardIdx = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state) => {
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error';
      })
      .addCase(fetchHeroCards.pending, (state) => {
        state.heroCardsLoadingStatus = 'loading';
      })
      .addCase(fetchHeroCards.fulfilled, (state, action) => {
        state.heroCards = [
          action.payload.hero,
          ...action.payload.cards.filter((card) => card.cardTypeId === 3),
        ];
        state.heroCardsLoadingStatus = 'idle';
      })
      .addCase(fetchHeroCards.rejected, (state) => {
        state.heroCardsLoadingStatus = 'error';
      });
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

export const {
  setHeroes,
  displayHero,
  resetCurrentHeroIdx,
  prevHero,
  nextHero,
} = actions;
