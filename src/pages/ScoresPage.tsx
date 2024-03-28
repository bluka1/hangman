import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setScores } from '../services/stores/scoresSlice';
import { retrieveScores } from '../services/api';
import { Button, HighscoresTable, Page } from '../components';
import { normalizeScores, sortScores } from '../utils/helpers';
import { RootState } from '../services/stores';
import { HighscoresRecord } from '../models';
import { Navigate } from 'react-router-dom';

const ScoresPage = () => {
  const hangmanState = useSelector((state: RootState) => state.hangman);
  const scores = useSelector((state: RootState) => state.scores.scores);
  const dispatch = useDispatch();
  const [restartGame, setRestartGame] = useState(false);

  if (!hangmanState.gameFinished) return <Navigate to="/game" />;

  const description = `Game finished. Take a look at the results table`;

  useEffect(() => {
    retrieveScores()
      .then(({ data }: { data: HighscoresRecord[] }) => {
        dispatch(setScores(sortScores(normalizeScores(data))));
      })
      .catch((err) => console.error(err));
  }, []);

  if (restartGame) return <Navigate to="/game" />;

  return (
    <Page description={description}>
      {scores && <HighscoresTable highscores={scores} />}

      <p className="play-again">Do you want to play again?</p>
      <Button
        text="PLAY AGAIN"
        isDisabled={false}
        handleClick={() => setRestartGame(true)}
      />
    </Page>
  );
};

export default ScoresPage;
