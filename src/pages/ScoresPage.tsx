import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, HighscoresTable, Page } from '../components';
import { RootState } from '../services/stores';
import { Navigate } from 'react-router-dom';

const ScoresPage = () => {
  const gameFinished = useSelector(
    (state: RootState) => state.hangman.gameFinished
  );
  const scores = useSelector((state: RootState) => state.scores.scores);
  const [restartGame, setRestartGame] = useState(false);

  if (!gameFinished) return <Navigate to="/game" />;
  if (restartGame) return <Navigate to="/game" />;

  const description = `Game finished. Take a look at the results table`;

  return (
    <Page description={description}>
      {scores ? (
        <HighscoresTable highscores={scores} />
      ) : (
        <p className="center-align">
          Something went wrong with fetching Top 20 scores...
        </p>
      )}

      <p className="center-align">Do you want to play again?</p>
      <Button
        text="PLAY AGAIN"
        isDisabled={false}
        handleClick={() => setRestartGame(true)}
      />
    </Page>
  );
};

export default ScoresPage;
