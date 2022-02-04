import { writable } from 'svelte/store';
import { browser } from '$app/env';

import { StatisticsLocalStorageKey } from '$lib/game/constants';
import type { StatisticsStore } from '$lib/models/stats';

const defaults: StatisticsStore = {
  daily: {
    currentStreak: 0,
    maxStreak: 0,
    guesses: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      fail: 0,
    },
    winPercentage: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    averageGuesses: 0,
  },
  random: {
    currentStreak: 0,
    maxStreak: 0,
    guesses: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      fail: 0,
    },
    winPercentage: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    averageGuesses: 0,
  },
};

const fetchStatistics = (): StatisticsStore => {
  const statistics: StatisticsStore = JSON.parse(localStorage.getItem(StatisticsLocalStorageKey) || '{}');
  return {
    ...defaults,
    ...statistics,
  };
};

const storeStatistics = (value: StatisticsStore) => {
  if (browser) {
    localStorage.setItem(StatisticsLocalStorageKey, JSON.stringify(value));
  }
};

export const stats = writable(browser ? fetchStatistics() : { ...defaults });

stats.subscribe(state => {
  storeStatistics(state);
});
