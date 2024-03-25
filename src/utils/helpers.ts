import { HighscoresRecord, Score } from '../models';

export async function resolveResponse(response: any) {
  if (response.status === 200 || response.status === 201) return response;
  if (response.status === 404)
    throw new Error('Word for hangman game not found.');
  throw new Error('Something went wrong :(');
}

export function extractUniqueLetters(quote: string): string[] {
  const filteredString = quote
    .toLowerCase()
    .split('')
    .filter((char) => /[a-z]/.test(char));
  return Array.from(new Set(filteredString));
}

export function normalizeScores(highscores: HighscoresRecord[]): Score[] {
  const scores = highscores.reduce((acc: Score[], record: HighscoresRecord) => {
    acc.push({
      userName: record.userName,
      score: calculateScore(record.errors),
    });
    return acc;
  }, []);
  return sortScores(scores);
}

export function sortScores(scores: Score[]): Score[] {
  return scores.sort((a, b) => a.score - b.score);
}

export function calculateScore(numberOfErrors: number): number {
  return 100 / (1 + numberOfErrors);
}
