import { EvaluationResult } from '$lib/models/game';

const evaluateGuess = (value: string, solution: string): EvaluationResult[] => {
  const result: EvaluationResult[] = Array(solution.length).fill(EvaluationResult.Absent);
  const unusedGuess = Array(solution.length).fill(true);
  const unusedSolution = Array(solution.length).fill(true);

  for (let i = 0; i < value.length; i++) {
    if (value[i] === solution[i] && unusedSolution[i]) {
      result[i] = EvaluationResult.Correct;
      unusedGuess[i] = false;
      unusedSolution[i] = false;
    }
  }

  for (let i = 0; i < value.length; i++) {
    const guessLetter = value[i];
    if (unusedGuess[i]) {
      for (let j = 0; j < solution.length; j++) {
        const solutionLetter = solution[j];
        if (unusedSolution[j] && guessLetter === solutionLetter) {
          result[i] = EvaluationResult.Present;
          unusedSolution[j] = false;
          break;
        }
      }
    }
  }

  return result;
};

export default evaluateGuess;
