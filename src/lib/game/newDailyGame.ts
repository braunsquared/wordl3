import type { Writable } from 'svelte/store';

import { GameStatus, RowStatus, GameMode } from '$lib/models/game';
import { MaxGuesses } from './constants';
import words from '$lib/assets/wordlist.json';

import type { GameState } from '$lib/models/game';
import getDailyGameIndex from './getDailyGameIndex';

const newDailyGame = (game: Writable<GameState>) => {
  const gameIdx = getDailyGameIndex();

  game.update(state => {
    const newState: GameState = {
      ...state,
      mode: GameMode.Daily,
      gameNumber: gameIdx,
      board: [],
      rowIndex: 0,
      status: GameStatus.InProgress,
      lastDaily: gameIdx,
    };

    for (let i = 0; i < MaxGuesses; i++) {
      newState.board.push({
        letters: '',
        status: RowStatus.Ok,
      });
    }
    newState.solution = words[gameIdx];
    return newState;
  });
};

export default newDailyGame;
