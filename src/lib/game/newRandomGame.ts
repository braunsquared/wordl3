import type { Writable } from 'svelte/store';

import { GameStatus, RowStatus, GameMode } from '$lib/models/game';
import { MaxGuesses } from './constants';
import words from '$lib/assets/wordlist.json';

import type { GameState } from '$lib/models/game';

const newRandomGame = (game: Writable<GameState>, number?: number) => {
  const gameIdx = number || Math.round(Math.random() * words.length);

  game.update(state => {
    const newState: GameState = {
      ...state,
      mode: GameMode.Random,
      gameNumber: gameIdx,
      board: [],
      rowIndex: 0,
      status: GameStatus.InProgress,
    };

    for (let i = 0; i < MaxGuesses; i++) {
      newState.board.push({
        letters: '',
        status: RowStatus.Ok,
      });
    }
    newState.solution = words[words.length - 1 - gameIdx];
    return newState;
  });
};

export default newRandomGame;
