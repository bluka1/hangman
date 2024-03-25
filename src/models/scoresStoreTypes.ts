export type ScoresState = {
  scores: Score[];
};

export type Score = {
  userName: string;
  score: number;
};

export type HighscoresRecord = {
  userName: string;
  errors: number;
};
