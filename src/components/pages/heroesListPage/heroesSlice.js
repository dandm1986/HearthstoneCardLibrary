// Импорт из внешних библиотек
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Импорт методов
import { useHttp } from '../../../hooks/http.hook';
import { createURL } from '../../../services/hearthstoneApiService';

const initialState = {
  heroes: [],
  heroesLength: 0,
  heroesLoadingStatus: 'idle',
  heroCards: null,
  currentHeroCardIdx: null,
  heroCardsLoadingStatus: 'idle',
  queryData: {
    apiBase: 'https://us.api.blizzard.com/hearthstone',
    endpoint: '/deck',
    filters: {
      locale: 'ru_RU',
    },
  },
};

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  ({ apiBase, endpoint, filters }) => {
    const { getData } = useHttp();

    const url = createURL({
      apiBase,
      endpoint,
      filters,
    });

    return getData(url);
  }
);

export const fetchHeroCards = createAsyncThunk(
  'heroes/fetchHeroCards',
  ({ apiBase, endpoint, filters }) => {
    const { getData } = useHttp();

    const url = createURL({
      apiBase,
      endpoint,
      filters,
    });

    return getData(url);
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
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
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes.push(action.payload);
        state.heroesLength++;
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

export const { displayHero, resetCurrentHeroIdx, prevHero, nextHero } = actions;
