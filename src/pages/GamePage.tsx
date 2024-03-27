import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Quote } from '../models';
import { retrieveQuote } from '../services/api';
import {
  setGuessedLetters,
  setQuote,
  resetState,
} from '../services/stores/hangmanSlice';
import { RootState } from '../services/stores/store';
import { extractUniqueLetters } from '../utils';
import { Navigate } from 'react-router-dom';
import { GameStatus, LetterBox, Page } from '../components';

const GamePage = () => {
  const hangmanState = useSelector((state: RootState) => state.hangman);
  const dispatch = useDispatch();

  const description =
    'The game has started. Start typing on your keyboard or just press the letters you see on the screen. Only letters allowed!';

  const handleKeyPress = (e: KeyboardEvent) => {
    const guess = e.key.toLowerCase();
    const isLetter = /[a-z]/.test(guess);

    if (isLetter) {
      dispatch(setGuessedLetters(guess));
    } else return;
  };

  const getQuote = async (): Promise<any> => {
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
  };

  function restartGame(event: any): any {
    dispatch(resetState());
    getQuote();
  }

  useEffect(() => {
    getQuote();
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  if (hangmanState.gameFinished === true) return <Navigate to="/scores" />;

  return (
    <Page description={description}>
      <GameStatus />
      <div className="hangman-quote">
        {hangmanState.quote ? (
          <>
            {hangmanState.quote.split('').map((char) => (
              <LetterBox key={Math.random().toFixed(9)} letter={char} />
            ))}
          </>
        ) : null}
      </div>
      <button className="reset-game" onClick={restartGame}>
        RESTART GAME
      </button>
    </Page>
  );
};

export default GamePage;
