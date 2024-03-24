export type QuoteData = {
  quote: string;
  quoteId: string;
  quoteLength: number;
  uniqueCharacters: string[];
};

export type HangmanStateBase = {
  quoteId: string;
  length: number;
  errors: number;
  userName: string;
  duration: number;
};

export type HangmanState = HangmanStateBase & {
  quote: string;
  uniqueCharacters: string[];
};
export type GameScore = HangmanStateBase & { uniqueCharacters: number };