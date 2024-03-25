import { configureStore } from '@reduxjs/toolkit';
import hangmanReducer from './hangmanSlice';
import scoresReducer from './scoresSlice';

export const store = configureStore({
  reducer: {
    hangman: hangmanReducer,
    scores: scoresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
