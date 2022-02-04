import { derived } from 'svelte/store';

import { daily } from './daily';
import { random } from './random';

export const game = derived([daily, random], ([$daily, $random]) => ({ daily: $daily, random: $random }));
