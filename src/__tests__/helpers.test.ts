import { describe, expect, test } from '@jest/globals';
import { calculateScoreAdvanced } from '../utils/helpers';

describe('test advanced score calculation', () => {
  test('function is pure', () => {
    expect(calculateScoreAdvanced(25, 12, 3, 100000)).toBe(750000);
  });

  test('fewer errors always give higher score', () => {
    const fewerErrors1 = calculateScoreAdvanced(25, 12, 2, 100000);
    const moreErrors1 = calculateScoreAdvanced(25, 12, 3, 100000);
    expect(fewerErrors1).toBeGreaterThan(moreErrors1);

    const fewerErrors2 = calculateScoreAdvanced(25, 12, 5, 100000);
    const moreErrors2 = calculateScoreAdvanced(100, 50, 6, 10);
    expect(fewerErrors2).toBeGreaterThan(moreErrors2);

    const fewerErrors3 = calculateScoreAdvanced(18, 7, 5, 100000000);
    const moreErrors3 = calculateScoreAdvanced(100, 50, 6, 10);
    expect(fewerErrors3).toBeGreaterThan(moreErrors3);
  });

  test('same number of errors, larger number of unique characters should give higher score', () => {
    const fewerCharacters1 = calculateScoreAdvanced(100, 10, 1, 10);
    const moreCharacters1 = calculateScoreAdvanced(25, 11, 1, 100000);
    expect(moreCharacters1).toBeGreaterThan(fewerCharacters1);

    const fewerCharacters2 = calculateScoreAdvanced(150, 24, 2, 10);
    const moreCharacters2 = calculateScoreAdvanced(15, 25, 2, 100000);
    expect(moreCharacters2).toBeGreaterThan(fewerCharacters2);

    const fewerCharacters3 = calculateScoreAdvanced(200, 20, 3, 10);
    const moreCharacters3 = calculateScoreAdvanced(10, 21, 3, 100000);
    expect(moreCharacters3).toBeGreaterThan(fewerCharacters3);
  });

  test('for the same number of errors and unique characters, longer quote should give higher score', () => {
    const longer1 = calculateScoreAdvanced(26, 10, 2, 100000);
    const shorter1 = calculateScoreAdvanced(25, 10, 2, 10);
    expect(longer1).toBeGreaterThan(shorter1);

    const longer2 = calculateScoreAdvanced(51, 20, 4, 100000);
    const shorter2 = calculateScoreAdvanced(50, 20, 4, 10);
    expect(longer2).toBeGreaterThan(shorter2);

    const longer3 = calculateScoreAdvanced(30, 15, 3, 100000);
    console.log('longer', longer3);

    const shorter3 = calculateScoreAdvanced(15, 15, 3, 100000);
    console.log('shorter', shorter3);

    expect(longer3).toBeGreaterThan(shorter3);
  });

  test('for the same number of errors, unique characters and length, faster solution should give higher score', () => {
    const faster1 = calculateScoreAdvanced(30, 15, 2, 10000);
    const slower1 = calculateScoreAdvanced(30, 15, 2, 100000);
    expect(faster1).toBeGreaterThan(slower1);

    const faster2 = calculateScoreAdvanced(50, 25, 5, 99999);
    const slower2 = calculateScoreAdvanced(50, 25, 5, 100000);
    expect(faster2).toBeGreaterThan(slower2);

    const faster3 = calculateScoreAdvanced(40, 20, 3, 99999);
    const slower3 = calculateScoreAdvanced(40, 20, 3, 100000);
    expect(faster3).toBeGreaterThan(slower3);
  });
});

export {};
