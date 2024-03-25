import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Score, ScoresState } from '../../models';

const initialState: ScoresState = {
  scores: [],
};

export const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    setScores: (state, action: PayloadAction<Score[]>) => {
      state.scores = [...action.payload];
    },
  },
});

export const { setScores } = scoresSlice.actions;

export default scoresSlice.reducer;
