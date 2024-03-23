import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HangmanState, QuoteData } from './types';

const initialState: HangmanState = {
  duration: 0,
  errors: 5,
  quote: null,
  quoteId: null,
  quoteLength: 0,
  uniqueCharacters: [],
  userName: null,
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
      state.quoteLength = action.payload.quoteLength;
      state.uniqueCharacters = action.payload.uniqueCharacters;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { setQuote, setUsername, setDuration, decrementErrors } =
  hangmanSlice.actions;

export default hangmanSlice.reducer;
