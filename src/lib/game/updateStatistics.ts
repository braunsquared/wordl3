import type { GameMode } from '$lib/models/game';
import { stats } from '$lib/stores/stats';

export interface GameOutcome {
  isWin: boolean;
  isStreak: boolean;
  numGuesses: number;
}

const updateStatistics = (type: GameMode, outcome: GameOutcome) => {
  stats.update(state => {
    const { isWin, isStreak, numGuesses } = outcome;

    if (isWin) {
      state[type].guesses[numGuesses] += 1;

      if (isStreak) {
        state[type].currentStreak += 1;
      } else {
        state[type].currentStreak = 1;
      }
    } else {
      state[type].currentStreak = 0;
      state[type].guesses.fail += 1;
    }

    state[type].maxStreak = Math.max(state[type].currentStreak, state[type].maxStreak);
    state[type].gamesPlayed += 1;
    state[type].gamesWon += isWin ? 1 : 0;
    state[type].winPercentage = Math.round((state[type].gamesWon / state[type].gamesPlayed) * 100);
    state[type].averageGuesses = Math.round(Object.entries(state[type].guesses).reduce((acc, [key, value]) => (key !== 'fail' ? acc + parseInt(key) * value : acc), 0) / state[type].gamesWon);
    return state;
  });
};

export default updateStatistics;
