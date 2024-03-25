import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setScores } from '../services/stores/scoresSlice';
import { retrieveScores } from '../services/api';
import { HighscoresTable, Page } from '../components';
import { normalizeScores } from '../utils/helpers';
import { RootState } from '../services/stores';

const GameScoresPage = () => {
  const scores = useSelector((state: RootState) => state.scores.scores);
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveScores()
      .then((data) => {
        console.log('data:', data.data);

        dispatch(setScores(normalizeScores(data.data)));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Page description="Game finished.">
      {scores && <HighscoresTable highscores={scores} />}
    </Page>
  );
};

export default GameScoresPage;
