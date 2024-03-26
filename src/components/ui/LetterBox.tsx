import { useSelector } from 'react-redux';
import { RootState } from '../../services/stores';

const LetterBox = ({ letter }: { letter: string }) => {
  const guessedLetters = useSelector(
    (state: RootState) => state.hangman.guessedLetters
  );
  const testLetter = () => {
    if (
      guessedLetters.includes(letter.toLowerCase()) ||
      (letter.charCodeAt(0) >= 32 && letter.charCodeAt(0) <= 64)
    ) {
      return letter;
    } else {
      return '*';
    }
  };
  return <span className="letter-box">{testLetter()}</span>;
};

export default LetterBox;
