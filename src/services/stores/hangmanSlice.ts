import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HangmanState, QuoteData } from '../../models/hangmanStoreTypes';

const initialState: HangmanState = {
  duration: 0,
  errors: 0,
  quote: '',
  quoteId: '',
  length: 0,
  uniqueCharacters: [],
  userName: '',
  guessedLetters: [],
  gameStartedAt: 0,
  gameFinishedAt: 0,
  maxErrors: 6,
  gameFinished: false,
  win: false,
};

export const hangmanSlice = createSlice({
  name: 'hangman',
  initialState,
  reducers: {
    decrementErrors: (state) => {
      state.errors--;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setQuote: (state, action: PayloadAction<QuoteData>) => {
      state.quote = action.payload.quote;
      state.quoteId = action.payload.quoteId;
      state.length = action.payload.quoteLength;
      state.uniqueCharacters = action.payload.uniqueCharacters;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setGuessedLetters: (state, action: PayloadAction<string>) => {
      if (state.guessedLetters.includes(action.payload)) return;
      state.guessedLetters.push(action.payload);
      if (state.uniqueCharacters.includes(action.payload)) return;
      else state.errors = state.errors + 1;
    },
    setGameStartedAt: (state, action: PayloadAction<number>) => {
      state.gameStartedAt = action.payload;
    },
    setGameFinishedAt: (state, action: PayloadAction<number>) => {
      state.gameFinishedAt = action.payload;
    },
    setGameFinished: (state, action: PayloadAction<boolean>) => {
      state.gameFinished = action.payload;
    },
    setWin: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload;
    },
    resetState: (state) => {},
  },
});

export const {
  setQuote,
  setUsername,
  setDuration,
  decrementErrors,
  setGuessedLetters,
  setGameStartedAt,
  setGameFinishedAt,
  setGameFinished,
  setWin,
  resetState,
} = hangmanSlice.actions;

export default hangmanSlice.reducer;
