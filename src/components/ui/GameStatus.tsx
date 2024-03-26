import { useDispatch, useSelector } from 'react-redux';
import { RootState, setGameFinished, setWin } from '../../services/stores';

const GameStatus = () => {
  const dispatch = useDispatch();

  const hangmanState = useSelector((state: RootState) => state.hangman);
  const recalculateGameStatus = () => {
    let count = 0;
    hangmanState.quote.split('').forEach((letter) => {
      if (
        hangmanState.guessedLetters.includes(letter.toLowerCase()) ||
        (letter.charCodeAt(0) >= 32 && letter.charCodeAt(0) <= 64)
      ) {
        count++;
      }
    });

    if (hangmanState.errors === hangmanState.maxErrors) {
      dispatch(setWin(false));
      dispatch(setGameFinished(true));
    } else if (
      hangmanState.errors < hangmanState.maxErrors &&
      count === hangmanState.quote.length &&
      hangmanState.quote.length > 0
    ) {
      dispatch(setWin(true));
      dispatch(setGameFinished(true));
    }
  };

  recalculateGameStatus();

  return (
    <p className="game-status">
      <b>Game status: playing - Number of errors: {hangmanState.errors} / 6</b>
    </p>
  );
};

export default GameStatus;
