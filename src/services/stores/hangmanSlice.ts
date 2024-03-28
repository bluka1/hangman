import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HangmanState, QuoteData } from '../../models/hangmanStoreTypes';

const initialState: HangmanState = {
  errors: 0,
  quote: '',
  quoteId: '',
  length: 0,
  uniqueCharacters: [],
  userName: '',
  guessedLetters: [],
  gameStartedAt: 0,
  maxErrors: 6,
  gameFinished: false,
  win: false,
};

export const hangmanSlice = createSlice({
  name: 'hangman',
  initialState,
  reducers: {
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
    setGameFinished: (state, action: PayloadAction<boolean>) => {
      state.gameFinished = action.payload;
    },
    setWin: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload;
    },
    resetState: (state) => {
      state.gameFinished = false;
      state.guessedLetters = [];
      state.length = 0;
      state.quote = '';
      state.quoteId = '';
      state.uniqueCharacters = [];
      state.win = false;
      state.errors = 0;
    },
  },
});

export const {
  setQuote,
  setUsername,
  setGuessedLetters,
  setGameStartedAt,
  setGameFinished,
  setWin,
  resetState,
} = hangmanSlice.actions;

export default hangmanSlice.reducer;
