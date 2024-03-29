import { useSelector } from 'react-redux';
import { RootState } from '../../services/stores';
import { LetterBox } from '..';

const WordBox = ({ word }: { word: string }) => {
  const guessedLetters = useSelector(
    (state: RootState) => state.hangman.guessedLetters
  );
  const markLetter = (word: string) => {
    let lettersBox: any = [];
    word.split('').forEach((letter) => {
      if (
        guessedLetters.includes(letter.toLowerCase()) ||
        (letter.charCodeAt(0) >= 32 && letter.charCodeAt(0) <= 64)
      ) {
        lettersBox.push(<LetterBox letter={letter} className={null} />);
      } else {
        lettersBox.push(<LetterBox letter={'*'} className={'underline'} />);
      }
    });
    return lettersBox;
  };
  return <span className="word-box">{markLetter(word)}</span>;
};

export default WordBox;
