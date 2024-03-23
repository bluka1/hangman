export type QuoteData = {
  quote: string;
  quoteId: number;
  quoteLength: number;
  uniqueCharacters: string[];
};

export interface HangmanState {
  quote: string | null;
  quoteId: number | null;
  quoteLength: number | null;
  errors: number;
  uniqueCharacters: string[];
  userName: string | null;
  duration: number;
}
