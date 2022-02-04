import { writable } from 'svelte/store';
import { browser } from '$app/env';

import { GameStatus, GameMode } from '$lib/models/game';
import type { GameState } from '$lib/models/game';

const localStorageKey = 'random';

const defaults: GameState = {
  mode: GameMode.Random,
  gameNumber: -1,
  board: [],
  rowIndex: 0,
  solution: '',
  status: GameStatus.Unknown,
  lastPlayedTs: null,
  lastCompletedTs: null,
};

const fetchGameState = (): GameState => {
  const state: GameState = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
  return {
    ...defaults,
    ...state,
  };
};

const updateGameState = (value: GameState) => {
  if (browser) {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }
};

export const random = writable(browser ? fetchGameState() : { ...defaults });

random.subscribe(state => {
  updateGameState(state);
});
