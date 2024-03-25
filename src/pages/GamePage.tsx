import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Quote } from '../models';
import { retrieveQuote } from '../services/api';
import { setQuote } from '../services/stores/hangmanSlice';
import { RootState } from '../services/stores/store';
import { extractUniqueLetters } from '../utils';
import { Link } from 'react-router-dom';

const GamePage = () => {
  const hangmanState = useSelector((state: RootState) => state.hangman);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   retrieveQuote()
  //     .then(({ data }: { data: Quote }) => {
  //       dispatch(
  //         setQuote({
  //           quote: data.content,
  //           quoteId: data._id,
  //           quoteLength: data.length,
  //           uniqueCharacters: extractUniqueLetters(data.content),
  //         })
  //       );
  //     })
  //     .catch((err) => console.error(err));
  // }, []);
  return (
    <div>
      GamePage
      <p>
        <Link to="/scores">SCORES</Link>
      </p>
    </div>
  );
};

export default GamePage;
