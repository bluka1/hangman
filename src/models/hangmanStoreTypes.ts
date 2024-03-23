export type QuoteData = {
  quote: string;
  quoteId: string;
  quoteLength: number;
  uniqueCharacters: string[];
};

export interface HangmanState {
  quote: string | null;
  quoteId: string | null;
  quoteLength: number | null;
  errors: number;
  uniqueCharacters: string[];
  userName: string | null;
  duration: number;
}
