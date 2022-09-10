import { configureStore } from '@reduxjs/toolkit';
import metadata from '../components/pages/startPage/startSlice';
import cards from '../components/pages/cardsListPage/cardsSlice';
import heroes from '../components/pages/heroesListPage/heroesSlice';

const store = configureStore({
  reducer: { metadata, cards, heroes },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
