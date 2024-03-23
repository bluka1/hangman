import axios from 'axios';
import { resolveResponse } from '../../utils/helpers';

export const quoteApi = axios.create({
  baseURL: 'http://api.quotable.io',
});

export const retrieveQuote = async () => {
  return quoteApi.get('/random').then((response) => resolveResponse(response));
};
