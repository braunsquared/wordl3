import type { Writable } from 'svelte/store';

import { GameStatus } from '$lib/models/game';

import type { GameState } from '$lib/models/game';

import updateStatistics from './updateStatistics';
import { MaxGuesses } from './constants';

const abandonGame = (game: Writable<GameState>) => {
  game.update(state => {
    updateStatistics(state.mode, {
      isWin: false,
      numGuesses: MaxGuesses,
    });

    return {
      ...state,
      status: GameStatus.Fail,
    };
  });
};

export default abandonGame;
