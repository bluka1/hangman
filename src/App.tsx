import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveQuote } from './services/api';
import { setQuote } from './services/stores/hangmanSlice';
import { RootState } from './services/stores/store';
import { Quote } from './models';
import { extractUniqueLetters } from './utils';
import './App.css';

function App() {
  const hangmanState = useSelector((state: RootState) => state.hangman);
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveQuote()
      .then(({ data }: { data: Quote }) => {
        dispatch(
          setQuote({
            quote: data.content,
            quoteId: data._id,
            quoteLength: data.length,
            uniqueCharacters: extractUniqueLetters(data.content),
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">
      <h1 className="app-title">Hangman</h1>
      <p>quote: {hangmanState.quote}</p>
      <p>quoteId: {hangmanState.quoteId}</p>
      <p>quoteLength: {hangmanState.quoteLength}</p>
      <p>uniqueChars: {hangmanState.uniqueCharacters}</p>
    </div>
  );
}

export default App;
