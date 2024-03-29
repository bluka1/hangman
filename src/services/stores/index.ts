export {
  default as hangmanReducer,
  hangmanSlice,
  setQuote,
  setUsername,
  setGuessedLetters,
  setGameStartedAt,
  setGameFinished,
  setWin,
  resetState,
} from './hangmanSlice';
export { store, type RootState, type AppDispatch } from './store';
export { setScores } from './scoresSlice';
