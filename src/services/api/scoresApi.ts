import axios from 'axios';
import { resolveResponse } from '../../utils/helpers';

export const scoresApi = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task',
});

export const retrieveScores = () => {
  return scoresApi
    .get('/highscores')
    .then((response) => resolveResponse(response));
};

export const postScores = () => {
  return scoresApi
    .post('/highscores')
    .then((response) => resolveResponse(response));
};
