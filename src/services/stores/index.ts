export {
  default as hangmanReducer,
  hangmanSlice,
  setQuote,
  setUsername,
  setDuration,
  decrementErrors,
} from './hangmanSlice';
export { store, type RootState, type AppDispatch } from './store';
