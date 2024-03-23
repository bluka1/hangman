export async function resolveResponse(response: any) {
  if (response.status === 200) return response;
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
