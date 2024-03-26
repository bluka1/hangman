export {
  default as hangmanReducer,
  hangmanSlice,
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
} from './hangmanSlice';
export { store, type RootState, type AppDispatch } from './store';
