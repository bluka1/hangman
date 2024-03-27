import { useSelector } from 'react-redux';
import { RootState } from '../../services/stores';

const LetterBox = ({ letter }: { letter: string }) => {
  let className: string | null = null;

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
      className = 'underline';
      return '*';
    }
  };
  const letterSign = testLetter();
  return <span className={`${className} letter-box`}>{letterSign}</span>;
};

export default LetterBox;
