import nth from '$lib/util/nth';
import { EvaluationResult } from '$lib/models/game';
import type { RowState } from '$lib/models/game';

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

const validateHardModeGuess = (guess: string | undefined, lastState: RowState | undefined): ValidationResult => {
  if (!guess || !lastState) {
    return {
      valid: true,
    };
  }

  const { letters: lastGuess, evaluation: lastResult } = lastState;

  for (let i = 0; i < lastResult.length; i++) {
    if (lastResult[i] === EvaluationResult.Correct && guess[i] !== lastGuess[i]) {
      return {
        valid: false,
        message: `${nth(i + 1)} letter must be ${lastGuess[i].toUpperCase()}`,
      };
    }
  }

  const requiredLetters: Record<string, number> = {};
  for (let i = 0; i < lastResult.length; i++) {
    if (lastResult[i] === EvaluationResult.Correct || lastResult[i] === EvaluationResult.Present) {
      requiredLetters[lastGuess[i]] = (requiredLetters[lastGuess[i]] || 0) + 1;
    }
  }

  const guessLetters = guess.split('').reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  for (const letter in requiredLetters) {
    if ((guessLetters[letter] || 0) < requiredLetters[letter]) {
      return {
        valid: false,
        message: `Guess must contain ${letter.toUpperCase()}`,
      };
    }
  }

  return { valid: true };
};

export default validateHardModeGuess;
