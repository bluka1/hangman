import { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { postScore, retrieveQuote, retrieveScores } from '../services/api';
import {
  setGuessedLetters,
  setQuote,
  setGameStartedAt,
  resetState,
} from '../services/stores/hangmanSlice';
import { LoadingContext } from '../context';
import { RootState, setScores } from '../services/stores';
import { Button, GameStatus, Page, WordBox } from '../components';
import { extractUniqueLetters, normalizeScores, sortScores } from '../utils';
import { HighscoresRecord, Quote } from '../models';

const GamePage = () => {
  const hangmanState = useSelector((state: RootState) => state.hangman);
  const scoresState = useSelector((state: RootState) => state.scores.scores);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const { setLoading } = useContext(LoadingContext);
  const [showTryAgain, setShowTryAgain] = useState(false);

  const description =
    'The game has started. Start typing on your keyboard or just press the letters you see on the screen. Only letters allowed!';

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
      setLoading(true);
      postScore({
        quoteId: hangmanState.quoteId,
        length: hangmanState.length,
        errors: hangmanState.errors,
        userName: hangmanState.userName,
        duration: Date.now() - hangmanState.gameStartedAt,
        uniqueCharacters: hangmanState.uniqueCharacters.length,
      })
        .catch(() => {
          setLoading(false);
          showErrorToast('sending your score');
        })
        .then(async () => getScores())
        .catch(() => {
          setLoading(false);
          showErrorToast('getting scores');
        });
    } else if (hangmanState.gameFinished === true && scoresState.length === 0) {
      setLoading(true);
      getScores();
    }
  }, [hangmanState.win, hangmanState.gameFinished]);

  if (redirect) return <Navigate to="/scores" />;

  function handleKeyPress(e: KeyboardEvent) {
    const guess = e.key.toLowerCase();
    const isLetter = /[a-z]/.test(guess);

    if (isLetter) {
      dispatch(setGuessedLetters(guess));
    } else return;
  }

  async function getQuote(): Promise<any> {
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
        setLoading(false);
        setShowTryAgain(false);
      })
      .catch((err) => {
        setLoading(false);
        showErrorToast('fetching quote');
        console.error(err);
        setShowTryAgain(true);
      });
  }

  async function getScores() {
    return retrieveScores()
      .then(({ data }: { data: HighscoresRecord[] }) => {
        dispatch(setScores(sortScores(normalizeScores(data))));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        showErrorToast('fetching scores');
        console.error(err);
      });
  }

  function visitSoresPage() {
    setRedirect(true);
  }

  function restartGame(): void {
    setLoading(true);
    dispatch(resetState());
    getQuote();
  }

  function showErrorToast(resource: string) {
    return toast.error(`Something went wrong with ${resource} :(`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
  }

  return (
    <Page description={description}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      {showTryAgain && (
        <Button
          text="Fetch Quote again"
          isDisabled={false}
          handleClick={restartGame}
        />
      )}
      <GameStatus />

      <div className="hangman-quote">
        {hangmanState.quote ? (
          <>
            {hangmanState.quote.split(' ').map((word) => (
              <WordBox word={word} />
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
      {!showTryAgain && (
        <div className="center-align">
          <Button
            isDisabled={false}
            text="RESTART GAME"
            handleClick={restartGame}
          />
        </div>
      )}
    </Page>
  );
};

export default GamePage;
