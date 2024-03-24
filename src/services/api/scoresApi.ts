import axios from 'axios';
import { resolveResponse } from '../../utils/helpers';
import { GameScore } from '../../models';

export const scoresApi = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task',
});

export const retrieveScores = () => {
  return scoresApi
    .get('/highscores')
    .then((response) => resolveResponse(response));
};

export const postScore = (score: GameScore) => {
  return scoresApi
    .post('/highscores', {
      body: score,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => resolveResponse(response));
};
