import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setScores } from '../services/stores/scoresSlice';
import { retrieveScores } from '../services/api';
import { HighscoresTable, Page } from '../components';
import { normalizeScores, sortScores } from '../utils/helpers';
import { RootState } from '../services/stores';
import { HighscoresRecord } from '../models';
import { Navigate } from 'react-router-dom';

const ScoresPage = () => {
  const hangmanState = useSelector((state: RootState) => state.hangman);
  const scores = useSelector((state: RootState) => state.scores.scores);
  const dispatch = useDispatch();

  if (!hangmanState.gameFinished) return <Navigate to="/game" />;

  const description = `Game finished. You ${
    hangmanState.win ? 'won :)' : 'lost :('
  }. Take a look at the results table`;

  useEffect(() => {
    retrieveScores()
      .then(({ data }: { data: HighscoresRecord[] }) => {
        dispatch(setScores(sortScores(normalizeScores(data))));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Page description={description}>
      {scores && <HighscoresTable highscores={scores} />}
    </Page>
  );
};

export default ScoresPage;
