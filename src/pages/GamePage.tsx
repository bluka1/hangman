import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Quote } from '../models';
import { postScore, retrieveQuote } from '../services/api';
import {
  setGuessedLetters,
  setQuote,
  setGameStartedAt,
  resetState,
} from '../services/stores/hangmanSlice';
import { RootState } from '../services/stores/store';
import { extractUniqueLetters } from '../utils';
import { Navigate } from 'react-router-dom';
import { Button, GameStatus, LetterBox, Page } from '../components';

const GamePage = () => {
  const hangmanState = useSelector((state: RootState) => state.hangman);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

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
        dispatch(setGameStartedAt(Date.now()));
      })
      .catch((err) => console.error(err));
  };

  function visitSoresPage() {
    setRedirect(true);
  }

  function restartGame(): void {
    dispatch(resetState());
    getQuote();
  }

  useEffect(() => {
    if (!hangmanState.gameFinished) {
      getQuote();
    }
    window.addEventListener('keypress', handleKeyPress);

    if (hangmanState.gameFinished) {
      window.removeEventListener('keypress', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [hangmanState.gameFinished]);

  useEffect(() => {
    if (hangmanState.gameFinished === true && hangmanState.win === true) {
      postScore({
        quoteId: hangmanState.quoteId,
        length: hangmanState.length,
        errors: hangmanState.errors,
        userName: hangmanState.userName,
        duration: Date.now() - hangmanState.gameStartedAt,
        uniqueCharacters: hangmanState.uniqueCharacters.length,
      });
    }
  }, [hangmanState.win]);

  if (redirect) return <Navigate to="/scores" />;

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

      <div className="hangman-term">
        {hangmanState.gameFinished && !hangmanState.win ? (
          <>
            <p>The hangman term was:</p>
            <p>{hangmanState.quote}</p>
          </>
        ) : null}
      </div>
      {hangmanState.gameFinished ? (
        <Button
          isDisabled={false}
          text="VISIT SCORES PAGE"
          handleClick={() => visitSoresPage()}
        />
      ) : null}
      <div className="play-again">
        <Button
          isDisabled={false}
          text="RESTART GAME"
          handleClick={restartGame}
        />
      </div>
    </Page>
  );
};

export default GamePage;
