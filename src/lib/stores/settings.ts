import { writable } from 'svelte/store';
import { browser } from '$app/env';

import type { Settings } from '$lib/models/game';

const isDarkMode = () => {
  console.log('IS DARKMODE');
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }

  return false;
};

const fetchSettings = (): Settings => ({
  hardMode: JSON.parse(localStorage?.getItem('hardMode') || 'null'),
  darkTheme: JSON.parse(localStorage?.getItem('darkTheme') || isDarkMode().toString()),
  colorBlindTheme: JSON.parse(localStorage?.getItem('colorBlindTheme') || 'null'),
});

const storeSetting = (key: string, value: boolean | null): void => {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const updateSettings = (value: Settings) => {
  if (browser) {
    Object.entries(value).forEach(([k, v]) => storeSetting(k, v));
  }
};

export const settings = writable(
  browser
    ? fetchSettings()
    : {
        hardMode: null,
        darkTheme: null,
        colorBlindTheme: null,
      }
);

settings.subscribe(newSettings => {
  updateSettings(newSettings);
});
